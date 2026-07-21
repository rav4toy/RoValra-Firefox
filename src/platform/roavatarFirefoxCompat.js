/**
 * `instanceof ArrayBuffer` is not reliable for values crossing Firefox's
 * page/extension compartments. The intrinsic tag survives that boundary.
 */
export function isFirefoxRealmArrayBuffer(value) {
    try {
        return Object.prototype.toString.call(value) === '[object ArrayBuffer]';
    } catch {
        return false;
    }
}

/**
 * Native Response objects can also arrive behind a Firefox Xray wrapper.
 * RoAvatar only needs to distinguish an HTTP response from parsed asset data,
 * so WebIDL capabilities are safer than `instanceof Response` here.
 */
export function isFirefoxRealmResponse(value) {
    try {
        return (
            value !== null &&
            typeof value === 'object' &&
            typeof value.status === 'number' &&
            typeof value.arrayBuffer === 'function' &&
            typeof value.clone === 'function'
        );
    } catch {
        return false;
    }
}

/**
 * Decode renderer images from background-fetched bytes. An HTMLImageElement
 * loaded in a Firefox content script can inherit the page principal and taint
 * the WebGL canvas even when the CDN supplies CORS headers. Decode from
 * extension-owned bytes, then copy into an origin-clean canvas source.
 *
 * THREE's Texture.flipY is intentionally ignored for ImageBitmap uploads.
 * Returning a canvas preserves the same flipY and Canvas2D behavior as the
 * HTMLImageElement used by RoAvatar in Chrome, including clothing atlases.
 */
export async function loadFirefoxCleanImage(resource, fetchFunction = fetch) {
    const response = await fetchFunction(resource, {
        credentials: 'omit',
    });

    if (!response?.ok) {
        throw new Error(
            `Unable to load renderer image (${response?.status ?? 'network error'}).`,
        );
    }

    const contentType =
        response.headers?.get?.('content-type')?.split(';', 1)[0] || '';
    const imageBytes = await response.arrayBuffer();
    const imageBlob = new Blob([imageBytes], { type: contentType });

    const imageBitmap = await createImageBitmap(imageBlob, {
        colorSpaceConversion: 'none',
        premultiplyAlpha: 'none',
    });

    const canvas =
        typeof OffscreenCanvas === 'function'
            ? new OffscreenCanvas(imageBitmap.width, imageBitmap.height)
            : document.createElement('canvas');
    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const context = canvas.getContext('2d');
    if (!context) {
        imageBitmap.close?.();
        throw new Error('Unable to create a clean renderer image canvas.');
    }

    context.drawImage(imageBitmap, 0, 0);
    imageBitmap.close?.();
    return canvas;
}
