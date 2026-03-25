const fs = require('fs');
const path = require('path');

const root = __dirname;
const dist = path.join(root, 'dist');
const manifestPath = path.join(root, 'manifest.json');
const packagePath = path.join(root, 'package.json');

function rimraf(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

function ensureDir(target) {
  fs.mkdirSync(target, { recursive: true });
}

function copyRecursive(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    ensureDir(dest);
    for (const entry of fs.readdirSync(src)) {
      copyRecursive(path.join(src, entry), path.join(dest, entry));
    }
  } else {
    ensureDir(path.dirname(dest));
    fs.copyFileSync(src, dest);
  }
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
if (pkg.version !== manifest.version) {
  pkg.version = manifest.version;
  fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`Updated package.json version to ${manifest.version}`);
}

rimraf(dist);
ensureDir(dist);

const filesToCopy = [
  ['manifest.json', 'manifest.json'],
  ['draco_decoder.js', 'draco_decoder.js'],
  ['content.js', 'content.js'],
  ['background.js', 'background.js'],
  ['intercept.js', 'intercept.js'],
  ['css', 'css'],
  ['public', 'public'],
  ['assets', 'assets'],
];

for (const [srcRel, destRel] of filesToCopy) {
  const src = path.join(root, srcRel);
  const dest = path.join(dist, destRel);
  if (!fs.existsSync(src)) {
    throw new Error(`Missing required build input: ${srcRel}`);
  }
  copyRecursive(src, dest);
  console.log(`Copied ${srcRel} -> dist/${destRel}`);
}

console.log('Build complete. dist contains only the packaged extension files required by the current version.');
