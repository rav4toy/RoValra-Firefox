import { FLAGS } from 'roavatar-renderer';
import { fetchInBackground } from '../backgroundFetch.js';

let rendererFetchBridgeInstalled = false;

function isSupportedRendererHost(hostname) {
    const normalizedHost = hostname.toLowerCase();
    return ['roblox.com', 'rovalra.com', 'rbxcdn.com'].some(
        (host) =>
            normalizedHost === host || normalizedHost.endsWith(`.${host}`),
    );
}

/**
 * Gives roavatar-renderer an extension-background fetch implementation. This
 * keeps JSON and binary mesh data out of Firefox's page/Xray compartment and
 * bypasses the page's Manifest V3 CORS restrictions.
 */
export function backgroundRendererRequests() {
    if (rendererFetchBridgeInstalled) return;
    rendererFetchBridgeInstalled = true;

    const nativeFetch = window.fetch.bind(window);
    FLAGS.API_REQUEST_PREFIX = '';
    FLAGS.FETCH_FUNC = (resource, options = {}) => {
        const rawUrl =
            resource && typeof resource.url === 'string'
                ? resource.url
                : String(resource);

        try {
            const parsedUrl = new URL(rawUrl, window.location.href);
            if (
                parsedUrl.protocol === 'https:' &&
                isSupportedRendererHost(parsedUrl.hostname)
            ) {
                return fetchInBackground(
                    parsedUrl.toString(),
                    options,
                    'arrayBuffer',
                ).catch((error) => {
                    console.error(
                        `RoValra: Renderer background request failed for ${parsedUrl.toString()}`,
                        error,
                    );
                    throw error;
                });
            }
        } catch {}

        return nativeFetch(resource, options);
    };
}
