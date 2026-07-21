import {
    ClampToEdgeWrapping,
    CubeTexture,
    LinearFilter,
    LinearMipmapLinearFilter,
    LinearMipmapNearestFilter,
    MirroredRepeatWrapping,
    NearestFilter,
    NearestMipmapLinearFilter,
    NearestMipmapNearestFilter,
    RepeatWrapping,
    SRGBColorSpace,
    Texture,
} from 'three';
import { isFirefox } from './pageBridge.js';

const firefoxTextureLoaders = new WeakSet();
const webglFilters = {
    9728: NearestFilter,
    9729: LinearFilter,
    9984: NearestMipmapNearestFilter,
    9985: LinearMipmapNearestFilter,
    9986: NearestMipmapLinearFilter,
    9987: LinearMipmapLinearFilter,
};
const webglWrappings = {
    33071: ClampToEdgeWrapping,
    33648: MirroredRepeatWrapping,
    10497: RepeatWrapping,
};

export function normalizeResourceUrl(url) {
    if (typeof url !== 'string' || !url) return url;

    try {
        return new URL(url).toString();
    } catch {
        return chrome.runtime.getURL(url.replace(/^\//, ''));
    }
}

export async function getFirefoxSafeMediaUrl(
    url,
    { fallbackToOriginal = true } = {},
) {
    const normalizedUrl = normalizeResourceUrl(url);
    if (!isFirefox() || typeof normalizedUrl !== 'string') {
        return normalizedUrl;
    }

    if (/^(?:data|blob|moz-extension):/i.test(normalizedUrl)) {
        return normalizedUrl;
    }

    try {
        const response = await chrome.runtime.sendMessage({
            action: 'fetchBinaryResource',
            url: normalizedUrl,
        });

        if (response?.ok && response.bodyBase64) {
            const contentType =
                response.contentType || 'application/octet-stream';
            return `data:${contentType};base64,${response.bodyBase64}`;
        }
    } catch (error) {
        console.warn(
            `RoValra: Firefox media proxy could not load ${normalizedUrl}`,
            error,
        );
    }

    return fallbackToOriginal ? normalizedUrl : null;
}

export function dataUrlToArrayBuffer(dataUrl) {
    if (typeof dataUrl !== 'string' || !dataUrl.startsWith('data:')) {
        throw new TypeError('Expected a data URL.');
    }

    const separatorIndex = dataUrl.indexOf(',');
    if (separatorIndex === -1) throw new TypeError('Malformed data URL.');

    const metadata = dataUrl.slice(5, separatorIndex);
    const encodedBody = dataUrl.slice(separatorIndex + 1);
    if (!/;base64(?:;|$)/i.test(metadata)) {
        return new TextEncoder().encode(decodeURIComponent(encodedBody)).buffer;
    }

    const binary = atob(encodedBody);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index++) {
        bytes[index] = binary.charCodeAt(index);
    }
    return bytes.buffer;
}

function getDataUrlContentType(dataUrl) {
    const separatorIndex = dataUrl.indexOf(',');
    if (separatorIndex === -1) return 'application/octet-stream';

    return (
        dataUrl.slice(5, separatorIndex).split(';', 1)[0] ||
        'application/octet-stream'
    );
}

async function getFirefoxImageBytes(url) {
    const normalizedUrl = normalizeResourceUrl(url);

    if (normalizedUrl.startsWith('data:')) {
        return {
            buffer: dataUrlToArrayBuffer(normalizedUrl),
            contentType: getDataUrlContentType(normalizedUrl),
        };
    }

    if (!normalizedUrl.startsWith('https:')) {
        throw new TypeError(
            `Firefox image decoding does not support ${normalizedUrl}`,
        );
    }

    const response = await chrome.runtime.sendMessage({
        action: 'fetchBinaryResource',
        url: normalizedUrl,
    });
    if (!response?.ok || !response.bodyBase64) {
        throw new Error(
            `Unable to fetch Firefox image resource (${response?.status ?? response?.error ?? 'unknown error'}).`,
        );
    }

    return {
        buffer: dataUrlToArrayBuffer(
            `data:application/octet-stream;base64,${response.bodyBase64}`,
        ),
        contentType: response.contentType || 'application/octet-stream',
    };
}

export async function loadFirefoxSafeImageBitmap(url) {
    const { buffer, contentType } = await getFirefoxImageBytes(url);
    return createImageBitmap(new Blob([buffer], { type: contentType }), {
        colorSpaceConversion: 'none',
        premultiplyAlpha: 'none',
    });
}

async function transformFirefoxImageBitmap(
    image,
    { angle = 0, darken = false } = {},
) {
    if (!angle && !darken) return image;

    const isRotated = Math.abs(angle) % 180 !== 0;
    const canvas = document.createElement('canvas');
    canvas.width = isRotated ? image.height : image.width;
    canvas.height = isRotated ? image.width : image.height;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('Could not create a skybox canvas.');

    context.translate(canvas.width / 2, canvas.height / 2);
    if (angle) context.rotate((angle * Math.PI) / 180);
    context.drawImage(image, -image.width / 2, -image.height / 2);
    if (darken) {
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.fillStyle = 'rgba(0, 0, 0, 0.55)';
        context.fillRect(0, 0, canvas.width, canvas.height);
    }

    const transformedImage = await createImageBitmap(canvas, {
        colorSpaceConversion: 'none',
        premultiplyAlpha: 'none',
    });
    image.close?.();
    return transformedImage;
}

/**
 * CubeTextureLoader creates HTMLImageElements, which Firefox can associate
 * with the Roblox page principal. Decode all six faces from extension-owned
 * bytes so WebGL accepts them without a security exception.
 */
export async function loadFirefoxSafeCubeTexture(urls, transforms = []) {
    if (!isFirefox()) return null;
    if (!Array.isArray(urls) || urls.length !== 6) {
        throw new TypeError('A cube texture requires exactly six image URLs.');
    }

    const images = await Promise.all(
        urls.map(async (url, index) =>
            transformFirefoxImageBitmap(
                await loadFirefoxSafeImageBitmap(url),
                transforms[index],
            ),
        ),
    );
    const cubeTexture = new CubeTexture(images);
    // CubeTextureLoader marks ordinary cube-map images as sRGB. Keep the
    // Firefox byte-decoding path color-identical instead of treating the
    // already sRGB-encoded sky pixels as linear data and washing them out.
    cubeTexture.colorSpace = SRGBColorSpace;
    cubeTexture.needsUpdate = true;
    return cubeTexture;
}

function getResourceDirectory(url) {
    try {
        return new URL('.', url).toString();
    } catch {
        return '';
    }
}

async function loadEmbeddedTexture(parser, textureIndex, sourceIndex) {
    const textureDef = parser.json.textures[textureIndex];
    const sourceDef = parser.json.images[sourceIndex];
    const imageBytes = await parser.getDependency(
        'bufferView',
        sourceDef.bufferView,
    );
    const imageBitmap = await createImageBitmap(
        new Blob([imageBytes], {
            type: sourceDef.mimeType || 'application/octet-stream',
        }),
        {
            colorSpaceConversion: 'none',
            premultiplyAlpha: 'none',
        },
    );
    const texture = new Texture(imageBitmap);
    const sampler = parser.json.samplers?.[textureDef.sampler] || {};

    texture.needsUpdate = true;
    texture.flipY = false;
    texture.name = textureDef.name || sourceDef.name || '';
    texture.magFilter = webglFilters[sampler.magFilter] || LinearFilter;
    texture.minFilter =
        webglFilters[sampler.minFilter] || LinearMipmapLinearFilter;
    texture.wrapS = webglWrappings[sampler.wrapS] || RepeatWrapping;
    texture.wrapT = webglWrappings[sampler.wrapT] || RepeatWrapping;
    texture.generateMipmaps =
        texture.minFilter !== NearestFilter &&
        texture.minFilter !== LinearFilter;

    if (sourceDef.extras && typeof sourceDef.extras === 'object') {
        Object.assign(texture.userData, sourceDef.extras);
    }
    texture.userData.mimeType =
        sourceDef.mimeType || 'application/octet-stream';
    parser.associations.set(texture, { textures: textureIndex });

    return texture;
}

/**
 * Firefox runs ImageBitmapLoader's fetch(blob:) under the Roblox page CSP.
 * Decode embedded GLTF images from their buffer views instead, without ever
 * creating or fetching a page-origin blob URL.
 */
export function registerFirefoxEmbeddedTextureLoader(loader) {
    if (
        !isFirefox() ||
        typeof loader?.register !== 'function' ||
        firefoxTextureLoaders.has(loader)
    ) {
        return;
    }

    firefoxTextureLoaders.add(loader);
    const pluginFactory = (parser) => ({
        name: 'ROVALRA_firefox_embedded_textures',
        loadTexture(textureIndex) {
            if (typeof createImageBitmap !== 'function') return null;

            const textureDef = parser.json.textures?.[textureIndex];
            const sourceIndex =
                textureDef?.extensions?.EXT_texture_webp?.source ??
                textureDef?.extensions?.EXT_texture_avif?.source ??
                textureDef?.source;
            const sourceDef = parser.json.images?.[sourceIndex];
            if (sourceDef?.bufferView === undefined) return null;

            return loadEmbeddedTexture(parser, textureIndex, sourceIndex).catch(
                (error) => {
                    console.error(
                        'RoValra: Failed to decode an embedded GLTF texture',
                        error,
                    );
                    return null;
                },
            );
        },
    });

    // GLTFLoader checks plugins in registration order. Its built-in WebP and
    // AVIF plugins also create blob URLs, so this Firefox plugin must run first.
    if (Array.isArray(loader.pluginCallbacks)) {
        loader.pluginCallbacks.unshift(pluginFactory);
    } else {
        loader.register(pluginFactory);
    }
}

/**
 * Firefox applies the Roblox page's connect-src policy when GLTFLoader calls
 * fetch(), including for generated data URLs. Parse proxied GLB bytes directly
 * so no page request is made.
 */
export async function loadFirefoxSafeGltf(loader, url) {
    const normalizedUrl = normalizeResourceUrl(url);
    if (!isFirefox()) return loader.loadAsync(normalizedUrl);

    const safeUrl = await getFirefoxSafeMediaUrl(normalizedUrl);
    if (!safeUrl.startsWith('data:')) return loader.loadAsync(safeUrl);

    const modelData = dataUrlToArrayBuffer(safeUrl);
    registerFirefoxEmbeddedTextureLoader(loader);
    return new Promise((resolve, reject) => {
        try {
            loader.parse(
                modelData,
                getResourceDirectory(normalizedUrl),
                resolve,
                reject,
            );
        } catch (error) {
            reject(error);
        }
    });
}
