// Firefox-specific compatibility helpers for the RoValra Firefox port.
// The Chrome build can inject MAIN world scripts directly from the manifest.
// Firefox MV3 uses a normal content script here and this module bridges the few
// calls that must run in the page world.

export function isFirefox() {
    return typeof navigator !== 'undefined' && /Firefox\//.test(navigator.userAgent || '');
}

export function dispatchCrossWorldEvent(target, eventName, detail) {
    if (typeof cloneInto !== 'undefined' && detail !== undefined) {
        target.dispatchEvent(
            new CustomEvent(eventName, {
                detail: cloneInto(detail, window.wrappedJSObject || window),
            }),
        );
    } else if (detail !== undefined) {
        target.dispatchEvent(new CustomEvent(eventName, { detail }));
    } else {
        target.dispatchEvent(new CustomEvent(eventName));
    }
}

export function injectFirefoxPageScripts() {
    if (!isFirefox()) return;
    if (document.__rovalraInterceptInjected) return;
    document.__rovalraInterceptInjected = true;
    try {
        const script = document.createElement('script');
        script.src = chrome.runtime.getURL('intercept.js');
        (document.head || document.documentElement).appendChild(script);
    } catch (e) {}
}

const pageFetchPending = new Map();

document.addEventListener('rovalra-page-fetch-response', (event) => {
    let detail = event.detail;
    try {
        if (typeof detail === 'string') detail = JSON.parse(detail);
    } catch (e) {
        return;
    }
    if (!detail || !detail.requestId) return;
    const resolver = pageFetchPending.get(detail.requestId);
    if (!resolver) return;
    pageFetchPending.delete(detail.requestId);
    resolver(detail);
});

export function pageFetch(url, options = {}) {
    if (!isFirefox()) return fetch(url, options);
    return new Promise((resolve, reject) => {
        const requestId = `rovalra_${Date.now()}_${Math.random().toString(36).slice(2)}`;
        const timer = setTimeout(() => {
            pageFetchPending.delete(requestId);
            reject(new Error(`Timed out waiting for page fetch response: ${url}`));
        }, 15000);
        pageFetchPending.set(requestId, (payload) => {
            clearTimeout(timer);
            if (payload?.error) {
                reject(new Error(payload.error));
                return;
            }
            resolve(
                new Response(payload?.body || '', {
                    status: payload?.status || 0,
                    statusText: payload?.statusText || '',
                    headers: payload?.headers || [],
                }),
            );
        });
        try {
            dispatchCrossWorldEvent(document, 'rovalra-page-fetch-request', {
                requestId,
                url,
                options,
            });
        } catch (e) {
            clearTimeout(timer);
            pageFetchPending.delete(requestId);
            reject(e);
        }
    });
}

export function fetchAssetAsDataUrl(url) {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ action: 'fetchAssetAsDataUrl', url }, (response) => {
            if (!chrome.runtime.lastError && response?.ok && response.dataUrl) {
                resolve(response.dataUrl);
                return;
            }
            reject(
                new Error(
                    chrome.runtime.lastError?.message ||
                        response?.error ||
                        `Failed to fetch asset: ${url}`,
                ),
            );
        });
    });
}

function needsImageProxy(url) {
    try {
        return (
            typeof url === 'string' &&
            /^https:\/\/www\.rovalra\.com\/static\/img\//i.test(url.trim())
        );
    } catch (e) {
        return false;
    }
}

const imageProxyCache = new Map();
async function proxyImageUrl(url) {
    if (!needsImageProxy(url)) return url;
    if (imageProxyCache.has(url)) return imageProxyCache.get(url);
    const promise = fetchAssetAsDataUrl(url).catch(() => url);
    imageProxyCache.set(url, promise);
    return promise;
}

function rewriteInlineImageStyle(el) {
    if (!el?.getAttribute) return;
    const style = el.getAttribute('style');
    if (!style?.includes('www.rovalra.com/static/img/')) return;
    const urls = [...style.matchAll(/url\((["']?)(https:\/\/www\.rovalra\.com\/static\/img\/[^)'"\s]+)\1\)/gi)].map(
        (m) => m[2],
    );
    if (!urls.length) return;
    Promise.all(urls.map((url) => proxyImageUrl(url).then((proxied) => [url, proxied]))).then(
        (pairs) => {
            let next = el.getAttribute('style') || '';
            for (const [url, proxied] of pairs) next = next.split(url).join(proxied);
            el.setAttribute('style', next);
        },
    );
}

function rewriteImages(root = document) {
    try {
        const nodes = [];
        if (root?.nodeType === 1) nodes.push(root);
        if (root?.querySelectorAll) nodes.push(...root.querySelectorAll('img, source, [style]'));
        for (const el of nodes) {
            if (el.tagName === 'IMG' || el.tagName === 'SOURCE') {
                const src = el.getAttribute('src');
                if (needsImageProxy(src)) {
                    proxyImageUrl(src).then((proxied) => {
                        if (proxied && proxied !== src) el.setAttribute('src', proxied);
                    });
                }
                const srcset = el.getAttribute('srcset');
                if (srcset?.includes('www.rovalra.com/static/img/')) {
                    const entries = srcset.split(',').map((part) => part.trim()).filter(Boolean);
                    Promise.all(
                        entries.map(async (entry) => {
                            const pieces = entry.split(/\s+/);
                            const url = pieces.shift();
                            const proxied = await proxyImageUrl(url);
                            return [proxied, ...pieces].join(' ');
                        }),
                    ).then((rewritten) => el.setAttribute('srcset', rewritten.join(', ')));
                }
            }
            rewriteInlineImageStyle(el);
        }
    } catch (e) {}
}

export function installImageCspFix() {
    if (!isFirefox()) return;
    rewriteImages(document);
    try {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                if (mutation.type === 'attributes') rewriteImages(mutation.target);
                for (const node of mutation.addedNodes || []) rewriteImages(node);
            }
        });
        observer.observe(document.documentElement || document, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['src', 'srcset', 'style'],
        });
    } catch (e) {}
    setTimeout(() => rewriteImages(document), 500);
    setTimeout(() => rewriteImages(document), 1500);
    setTimeout(() => rewriteImages(document), 3500);
}

export function headersToPlainObject(headers = {}) {
    const result = {};
    try {
        new Headers(headers).forEach((value, key) => {
            result[key] = value;
        });
        return result;
    } catch (e) {}
    if (Array.isArray(headers)) {
        for (const entry of headers) {
            if (Array.isArray(entry) && entry.length >= 2) result[entry[0]] = entry[1];
        }
        return result;
    }
    if (headers && typeof headers === 'object') return { ...headers };
    return result;
}

function base64ToUint8Array(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    return bytes;
}

function isArrayBufferLike(value) {
    if (!value) return false;
    try {
        if (value instanceof ArrayBuffer || Object.prototype.toString.call(value) === '[object ArrayBuffer]') return true;
    } catch (e) {}
    try {
        if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView?.(value)) return true;
    } catch (e) {}
    try {
        return typeof value.byteLength === 'number' && (typeof value.slice === 'function' || value.buffer !== undefined);
    } catch (e) {
        return false;
    }
}

export function cloneArrayBufferToLocal(value) {
    if (!isArrayBufferLike(value)) return value;
    try {
        const bytes = ArrayBuffer.isView(value)
            ? new Uint8Array(value.buffer, value.byteOffset || 0, value.byteLength)
            : new Uint8Array(value);
        return new Uint8Array(bytes).buffer;
    } catch (e) {
        try {
            return value.slice(0);
        } catch (e2) {
            return value;
        }
    }
}

export function normalizeExternalResourceUrl(url) {
    if (!url || typeof url !== 'string') return url;
    if (/^(data:|blob:|moz-extension:|chrome-extension:)/i.test(url)) return url;
    const trimmed = url.trim();
    const idMatch = trimmed.match(/(?:^|[?&=/])(\d{5,})(?:\D|$)/);
    if (/^rbxassetid:\/\//i.test(trimmed)) {
        return `https://assetdelivery.roblox.com/v1/asset?id=${trimmed.slice(13)}`;
    }
    if (/roblox\.com\/asset/i.test(trimmed) && idMatch) {
        return `https://assetdelivery.roblox.com/v1/asset?id=${idMatch[1]}`;
    }
    if (/assetdelivery\.roblox\.com\/v\d+\/asset/i.test(trimmed) && idMatch) {
        return `https://assetdelivery.roblox.com/v1/asset?id=${idMatch[1]}`;
    }
    try {
        return new URL(trimmed).toString();
    } catch (e) {}
    if (trimmed.startsWith('//')) return `https:${trimmed}`;
    if (trimmed.startsWith('/')) return `https://www.rovalra.com${trimmed}`;
    if (
        trimmed.startsWith('assets/') ||
        trimmed.startsWith('./assets/') ||
        trimmed.startsWith('../assets/') ||
        trimmed.startsWith('public/')
    ) {
        try {
            return chrome.runtime.getURL(trimmed.replace(/^\.\//, '').replace(/^\.\.\//, ''));
        } catch (e) {}
    }
    return `https://www.rovalra.com/${trimmed.replace(/^\.\/?/, '')}`;
}

function shouldUseCredentialedBackgroundFetch(url) {
    if (!url || typeof url !== 'string') return false;
    try {
        const host = new URL(normalizeExternalResourceUrl(url)).hostname.toLowerCase();
        return (
            /(^|\.)roblox\.com$/i.test(host) ||
            /(^|\.)roblox\.cn$/i.test(host) ||
            /(^|\.)rbx\.com$/i.test(host) ||
            /(^|\.)robloxlabs\.com$/i.test(host) ||
            /(^|\.)rblx\.org$/i.test(host)
        );
    } catch (e) {
        return false;
    }
}

export function resolveBackgroundFetchCredentials(url, credentials = 'omit') {
    return credentials === 'omit' && shouldUseCredentialedBackgroundFetch(url) ? 'include' : credentials;
}

export async function fetchBinaryResourceViaBackground(url, options = {}) {
    const { headers = {}, credentials = 'omit', noCache = true } = options;
    const requestCredentials = resolveBackgroundFetchCredentials(url, credentials);
    const requestHeaders = headersToPlainObject(headers);
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            {
                action: 'fetchBinaryResource',
                url,
                headers: requestHeaders,
                credentials: requestCredentials,
                noCache,
            },
            (response) => {
                if (chrome.runtime.lastError || !response) {
                    reject(new Error(chrome.runtime.lastError?.message || 'Background fetch failed'));
                    return;
                }
                const base64 = response.bodyBase64 || response.body;
                if (response.ok && base64) {
                    try {
                        const bytes = base64ToUint8Array(base64);
                        const arrayBuffer = cloneArrayBufferToLocal(
                            bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
                        );
                        const contentType = response.contentType || 'application/octet-stream';
                        const blob = new Blob([arrayBuffer], { type: contentType });
                        const objectUrl = isFirefox() ? null : URL.createObjectURL(blob);
                        resolve({
                            objectUrl,
                            dataUrl: `data:${contentType};base64,${base64}`,
                            arrayBuffer,
                            contentType,
                            revoke() {
                                if (objectUrl) {
                                    try {
                                        URL.revokeObjectURL(objectUrl);
                                    } catch (e) {}
                                }
                            },
                        });
                    } catch (e) {
                        reject(e);
                    }
                } else {
                    reject(new Error(response.statusText || response.error || `HTTP ${response.status || 500}`));
                }
            },
        );
    });
}
