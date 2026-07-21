const extensionBinaryBodies = new WeakMap();
const extensionTextBodies = new WeakMap();

function headersToPlainObject(headers) {
    const serializedHeaders = {};
    if (!headers) return serializedHeaders;

    if (typeof headers.forEach === 'function') {
        headers.forEach((value, key) => {
            serializedHeaders[String(key).toLowerCase()] = String(value);
        });
        return serializedHeaders;
    }

    if (Array.isArray(headers)) {
        for (const [key, value] of headers) {
            serializedHeaders[String(key).toLowerCase()] = String(value);
        }
        return serializedHeaders;
    }

    if (typeof headers === 'object') {
        for (const [key, value] of Object.entries(headers)) {
            serializedHeaders[String(key).toLowerCase()] = String(value);
        }
    }

    return serializedHeaders;
}

class ExtensionRealmHeaders {
    constructor(headers = {}) {
        this.valuesByName = new Map(
            Object.entries(headersToPlainObject(headers)),
        );
    }

    get(name) {
        return this.valuesByName.get(String(name).toLowerCase()) ?? null;
    }

    has(name) {
        return this.valuesByName.has(String(name).toLowerCase());
    }

    forEach(callback, thisArg) {
        for (const [name, value] of this.valuesByName) {
            callback.call(thisArg, value, name, this);
        }
    }

    entries() {
        return this.valuesByName.entries();
    }

    keys() {
        return this.valuesByName.keys();
    }

    values() {
        return this.valuesByName.values();
    }

    [Symbol.iterator]() {
        return this.entries();
    }
}

/**
 * A minimal Response-compatible value implemented entirely in the extension
 * compartment. Extending Firefox's native Response would put the body and
 * Headers back behind the page's Xray boundary.
 */
class ExtensionRealmResponse {
    constructor(body, init, extensionBinaryBody = null) {
        this.status = Number(init?.status ?? 200);
        this.statusText = String(init?.statusText ?? '');
        this.headers = new ExtensionRealmHeaders(init?.headers);
        this.ok = this.status >= 200 && this.status <= 299;
        this.redirected = false;
        this.type = 'basic';
        this.url = String(init?.url ?? '');
        this.body = null;
        this.bodyUsed = false;

        if (extensionBinaryBody !== null) {
            extensionBinaryBodies.set(this, extensionBinaryBody);
        } else {
            extensionTextBodies.set(this, body === null ? '' : String(body));
        }
    }

    clone() {
        const extensionBinaryBody = extensionBinaryBodies.get(this);
        if (extensionBinaryBody) {
            const clonedBody = extensionBinaryBody.slice(0);
            return new ExtensionRealmResponse(
                clonedBody,
                {
                    status: this.status,
                    statusText: this.statusText,
                    headers: this.headers,
                    url: this.url,
                },
                clonedBody,
            );
        }

        return new ExtensionRealmResponse(extensionTextBodies.get(this) ?? '', {
            status: this.status,
            statusText: this.statusText,
            headers: this.headers,
            url: this.url,
        });
    }

    async arrayBuffer() {
        const extensionBinaryBody = extensionBinaryBodies.get(this);
        if (extensionBinaryBody) return extensionBinaryBody.slice(0);

        return new TextEncoder().encode(extensionTextBodies.get(this) ?? '')
            .buffer;
    }

    async json() {
        const extensionBinaryBody = extensionBinaryBodies.get(this);
        if (extensionBinaryBody) {
            return JSON.parse(new TextDecoder().decode(extensionBinaryBody));
        }

        return JSON.parse(extensionTextBodies.get(this) ?? '');
    }

    async text() {
        const extensionBinaryBody = extensionBinaryBodies.get(this);
        if (extensionBinaryBody) {
            return new TextDecoder().decode(extensionBinaryBody);
        }

        return extensionTextBodies.get(this) ?? '';
    }

    async blob() {
        return new Blob([await this.arrayBuffer()], {
            type: this.headers.get('content-type') || '',
        });
    }
}

function base64ToArrayBuffer(base64) {
    const binary = atob(base64);
    const bytes = new Uint8Array(binary.length);

    for (let index = 0; index < binary.length; index++) {
        bytes[index] = binary.charCodeAt(index);
    }

    return bytes.buffer;
}

/**
 * Runs a request in the extension background page. Firefox Manifest V3
 * content scripts share the page's CORS restrictions, while background pages
 * retain the cross-origin privileges granted by host_permissions.
 */
export function fetchInBackground(fullUrl, init = {}, responseType = 'text') {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage(
            {
                action: 'fetchRobloxApi',
                options: {
                    fullUrl,
                    method: init.method || 'GET',
                    body: init.body ?? null,
                    headers: headersToPlainObject(init.headers),
                    credentials: init.credentials,
                    cache: init.cache,
                    noCache: init.cache === 'no-store',
                    responseType,
                },
            },
            (response) => {
                const runtimeError = chrome.runtime.lastError;
                if (runtimeError) {
                    reject(new Error(runtimeError.message));
                    return;
                }

                if (!response) {
                    reject(
                        new Error(
                            'The background request returned no response.',
                        ),
                    );
                    return;
                }

                if (response.error && !response.status) {
                    reject(new Error(response.error));
                    return;
                }

                try {
                    const responseMustNotHaveBody =
                        init.method === 'HEAD' ||
                        [204, 205, 304].includes(response.status);
                    const extensionBinaryBody =
                        responseType === 'arrayBuffer' &&
                        typeof response.bodyBase64 === 'string'
                            ? base64ToArrayBuffer(response.bodyBase64)
                            : null;
                    const responseBody =
                        extensionBinaryBody ?? response.body ?? null;
                    resolve(
                        new ExtensionRealmResponse(
                            responseMustNotHaveBody ? null : responseBody,
                            {
                                status: response.status,
                                statusText: response.statusText,
                                headers: response.headers,
                                url: fullUrl,
                            },
                            responseMustNotHaveBody
                                ? null
                                : extensionBinaryBody,
                        ),
                    );
                } catch (error) {
                    reject(error);
                }
            },
        );
    });
}

export {
    base64ToArrayBuffer,
    ExtensionRealmHeaders,
    ExtensionRealmResponse,
    headersToPlainObject,
};
