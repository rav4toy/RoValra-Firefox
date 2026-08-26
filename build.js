const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');
const yaml = require('yaml');
let sass = null;
try {
    sass = require('sass');
} catch (e) {
    console.warn('Sass not found, skipping SCSS compilation.');
}
const dracoPath = path.join(
    __dirname,
    'node_modules',
    'roavatar-renderer',
    'dist',
    'draco_decoder.js',
);
const backgroundEntryPath = path.join(
    __dirname,
    'src',
    'background',
    'background.js',
);
const interceptEntryPath = path.join(
    __dirname,
    'src',
    'content',
    'core',
    'xhr',
    'intercept.js',
);
const contentEntryPath = path.join(__dirname, 'src', 'content', 'index.js');
const firefoxBridgeEntryPath = path.join(
    __dirname,
    'src',
    'content',
    'firefoxBridge.js',
);
const extensionApiCompatPath = path.join(
    __dirname,
    'src',
    'platform',
    'extensionApiCompat.js',
);
const roavatarFirefoxCompatPath = path.join(
    __dirname,
    'src',
    'platform',
    'roavatarFirefoxCompat.js',
);
const roavatarRendererPath = path.join(
    __dirname,
    'node_modules',
    'roavatar-renderer',
    'dist',
    'index.js',
);

const roavatarImageLoaderSource = `              const image = new Image();
              image.onload = () => {
                cacheResolve(image);
                resolve(image);
                CACHE.Image.set(cacheURL, image);
              };
              image.onerror = () => {
                cacheResolve(void 0);
                resolve(void 0);
                CACHE.Image.set(cacheURL, void 0);
              };
              image.crossOrigin = "anonymous";
              image.src = fetchStr;`;

const roavatarImageLoaderReplacement = `              loadFirefoxCleanImage(fetchStr, FLAGS.FETCH_FUNC || fetch).then((image) => {
                cacheResolve(image);
                resolve(image);
                CACHE.Image.set(cacheURL, image);
              }).catch(() => {
                cacheResolve(void 0);
                resolve(void 0);
                CACHE.Image.set(cacheURL, void 0);
              });`;

const roavatarInstanceWrapperStaticSource = `  static() {
    return this.constructor;
  }
  static IsA(className) {`;

const roavatarInstanceWrapperStaticReplacement = `  static() {
    const wrapperClass = ClassNameToWrapper.get(this.instance.className);
    if (!wrapperClass) {
      throw new Error(\`RoAvatar Firefox wrapper lookup failed for \${this.instance.className}.\`);
    }
    return wrapperClass;
  }
  static IsA(className) {`;

const roavatarFirefoxCompatPlugin = {
    name: 'roavatar-firefox-compat',
    setup(build) {
        build.onLoad(
            {
                filter: /roavatar-renderer[\\/]dist[\\/]index\.js$/,
            },
            (args) => {
                let contents = fs.readFileSync(args.path, 'utf8');
                const arrayBufferCheck =
                    /([A-Za-z_$][\w$]*) instanceof ArrayBuffer/g;
                const responseCheck = /([A-Za-z_$][\w$]*) instanceof Response/g;
                const arrayBufferCheckCount =
                    contents.match(arrayBufferCheck)?.length || 0;
                const responseCheckCount =
                    contents.match(responseCheck)?.length || 0;

                if (arrayBufferCheckCount !== 6) {
                    throw new Error(
                        `Expected six RoAvatar ArrayBuffer checks, found ${arrayBufferCheckCount}.`,
                    );
                }
                if (responseCheckCount !== 25) {
                    throw new Error(
                        `Expected 25 RoAvatar Response checks, found ${responseCheckCount}.`,
                    );
                }
                if (!contents.includes(roavatarImageLoaderSource)) {
                    throw new Error(
                        'Could not find RoAvatar image loader for the Firefox compatibility patch.',
                    );
                }
                if (!contents.includes(roavatarInstanceWrapperStaticSource)) {
                    throw new Error(
                        'Could not find RoAvatar InstanceWrapper.static() for the Firefox compatibility patch.',
                    );
                }

                contents = contents.replace(
                    arrayBufferCheck,
                    'isFirefoxRealmArrayBuffer($1)',
                );
                contents = contents.replace(
                    responseCheck,
                    'isFirefoxRealmResponse($1)',
                );
                contents = contents.replace(
                    roavatarImageLoaderSource,
                    roavatarImageLoaderReplacement,
                );
                contents = contents.replace(
                    roavatarInstanceWrapperStaticSource,
                    roavatarInstanceWrapperStaticReplacement,
                );

                return {
                    contents,
                    loader: 'js',
                    resolveDir: path.dirname(roavatarRendererPath),
                };
            },
        );
    },
};

const manifestPath = path.join(__dirname, 'manifest.json');
const packagePath = path.join(__dirname, 'package.json');
let pkg;

try {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));

    if (pkg.version !== manifest.version) {
        pkg.version = manifest.version;
        fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
        console.log(`Updated package.json version to ${manifest.version}`);
    }
} catch (e) {
    console.error(
        'Failed to sync version from manifest.json to package.json',
        e,
    );
    process.exit(1);
}
//E why the hell did i make this comment?
const bannerText = `/*!
 * ${pkg.name} v${pkg.version}
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */`;

const commonConfig = {
    minify: false,

    target: ['firefox140'],

    minifyWhitespace: false,
    minifySyntax: true,
    minifyIdentifiers: false,

    keepNames: true,

    logLevel: 'info',

    legalComments: 'none',

    banner: {
        js: bannerText,
        css: bannerText,
    },
};

function compileScssFile(inputFile, outputFile) {
    if (!sass) return;
    try {
        const outputDir = path.dirname(outputFile);
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }
        const result = sass.compile(inputFile, { style: 'compressed' });
        fs.writeFileSync(outputFile, bannerText + '\n' + result.css);
        console.log(`Compiled SCSS: ${inputFile} -> ${outputFile}`);
    } catch (e) {
        console.error(`SCSS Compilation Failed for ${inputFile}:`, e.message);
    }
}

esbuild
    .build({
        ...commonConfig,
        entryPoints: [backgroundEntryPath],
        outfile: 'dist/background.js',
        bundle: true,
        inject: [extensionApiCompatPath],
    })
    .catch(() => process.exit(1));

esbuild
    .build({
        ...commonConfig,
        entryPoints: [interceptEntryPath],
        outfile: 'dist/intercept.js',
        bundle: false,
    })
    .catch(() => process.exit(1));
esbuild
    .build({
        ...commonConfig,
        entryPoints: [firefoxBridgeEntryPath],
        outfile: 'dist/firefox-bridge.js',
        bundle: true,
    })
    .catch(() => process.exit(1));

const cssDir = path.join(__dirname, 'src', 'css');

if (sass && fs.existsSync(cssDir)) {
    const mainScss = path.join(cssDir, 'main.scss');
    if (fs.existsSync(mainScss)) {
        try {
            const result = sass.compile(mainScss, { style: 'compressed' });
            if (!fs.existsSync('dist/css'))
                fs.mkdirSync('dist/css', { recursive: true });
            fs.writeFileSync(
                'dist/css/rovalra.css',
                bannerText + '\n' + result.css,
            );
            console.log(
                'Compiled SCSS: src/css/main.scss -> dist/css/rovalra.css',
            );
        } catch (e) {
            console.error('SCSS Compilation Failed:', e.message);
        }
    }

    const sitewideScss = path.join(cssDir, 'sitewide.scss');
    if (fs.existsSync(sitewideScss)) {
        try {
            const result = sass.compile(sitewideScss, { style: 'expanded' });
            if (!fs.existsSync('dist/css'))
                fs.mkdirSync('dist/css', { recursive: true });
            fs.writeFileSync(
                'dist/css/sitewide.css',
                bannerText + '\n' + result.css,
            );
            console.log(
                'Compiled SCSS: src/css/sitewide.scss -> dist/css/sitewide.css',
            );
        } catch (e) {
            console.error('SCSS Compilation Failed:', e.message);
        }
    }

    const independentCssDir = path.join(cssDir, 'independent');
    if (fs.existsSync(independentCssDir)) {
        const walkSync = (dir, callback) => {
            fs.readdirSync(dir).forEach((file) => {
                const filePath = path.join(dir, file);
                if (fs.statSync(filePath).isDirectory()) {
                    walkSync(filePath, callback);
                } else if (file.endsWith('.scss')) {
                    callback(filePath);
                }
            });
        };

        walkSync(independentCssDir, (filePath) => {
            const relativePath = path.relative(independentCssDir, filePath);
            const outputName = relativePath
                .replace(/\\|\//g, '-')
                .replace('.scss', '.css');
            compileScssFile(filePath, path.join('dist', 'css', outputName));
        });
    }
}

if (!fs.existsSync(dracoPath)) {
    console.error(`Error: draco_decoder.js not found at ${dracoPath}`);
    process.exit(1);
}
const dracoSource = fs.readFileSync(dracoPath, 'utf8');
if (!fs.existsSync('dist')) fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync('dist/draco_decoder.js', `${bannerText}\n${dracoSource}`);
console.log('Copied Draco decoder: dist/draco_decoder.js');

esbuild
    .build({
        ...commonConfig,
        entryPoints: [contentEntryPath],
        outfile: 'dist/content.js',
        bundle: true,
        loader: { '.rbxm': 'base64' },
        inject: [extensionApiCompatPath, roavatarFirefoxCompatPath],
        plugins: [roavatarFirefoxCompatPlugin],
        minify: true,
        minifyWhitespace: true,
        minifySyntax: true,
        minifyIdentifiers: true,
        pure: ['console.debug', 'console.log'],
        keepNames: true,
    })
    .catch(() => process.exit(1));
if (fs.existsSync(cssDir)) {
    const cssFiles = fs
        .readdirSync(cssDir)
        .filter((file) => file.endsWith('.css'))
        .map((file) => path.join(cssDir, file));

    if (cssFiles.length > 0) {
        esbuild
            .build({
                ...commonConfig,
                entryPoints: cssFiles,
                outdir: 'dist/css',
            })
            .catch(() => process.exit(1));
    }
}

function processDirectory(src, dest) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

    const entries = fs.readdirSync(src, { withFileTypes: true });

    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);

        if (entry.isDirectory()) {
            processDirectory(srcPath, destPath);
        } else {
            const ext = path.extname(entry.name).toLowerCase();

            if (ext === '.js' || ext === '.css' || ext === '.ts') {
                try {
                    const content = fs.readFileSync(srcPath, 'utf8');

                    const result = esbuild.transformSync(content, {
                        loader: ext.slice(1),
                        minifyWhitespace: false,
                        minifySyntax: true,
                        minifyIdentifiers: false,
                        keepNames: true,
                        legalComments: 'none',
                        banner: bannerText,
                    });

                    fs.writeFileSync(destPath, result.code);
                    console.log(`Copied, Compressed & Bannered: ${entry.name}`);
                } catch (err) {
                    console.error(
                        `Error processing ${entry.name}, copying raw instead.`,
                        err,
                    );
                    fs.copyFileSync(srcPath, destPath);
                }
            } else if (ext === '.yaml') {
                try {
                    const data = yaml.parse(fs.readFileSync(srcPath, 'utf8'));
                    fs.writeFileSync(
                        destPath.slice(0, destPath.length - 4) + 'json',
                        JSON.stringify(data, undefined, ' '),
                    );
                } catch (err) {
                    console.error(`Error processing ${entry.name}.`, err);
                    throw err;
                }
            } else {
                fs.copyFileSync(srcPath, destPath);
            }
        }
    }
}

if (fs.existsSync('public')) {
    processDirectory('public', path.join('dist', 'public'));
}
if (fs.existsSync('assets')) {
    processDirectory('assets', path.join('dist', 'assets'));
}

if (fs.existsSync('manifest.json')) {
    try {
        const manifestContent = fs.readFileSync('manifest.json', 'utf8');
        JSON.parse(manifestContent);
        fs.copyFileSync('manifest.json', 'dist/manifest.json');
    } catch (e) {
        console.log(e);
        fs.copyFileSync('manifest.json', 'dist/manifest.json');
    }
}
