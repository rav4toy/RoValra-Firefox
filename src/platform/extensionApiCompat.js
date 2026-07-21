/*
 * Firefox exposes callback-compatible APIs through `chrome` and Promise APIs
 * through `browser`. RoValra uses both styles, so route each call to the
 * namespace whose calling convention matches it.
 */

const nativeChrome = globalThis.chrome;
const nativeBrowser = globalThis.browser;

function isObjectLike(value) {
    return (
        value !== null &&
        (typeof value === 'object' || typeof value === 'function')
    );
}

function readProperty(owner, property) {
    if (!isObjectLike(owner)) return undefined;

    try {
        return owner[property];
    } catch {
        return undefined;
    }
}

export function createExtensionApiCompat(chromeApi, browserApi) {
    if (!browserApi) return chromeApi;

    const proxyCache = new Map();

    function createNamespace(chromeNamespace, browserNamespace, path = '') {
        const cacheKey = `${path}:${Boolean(chromeNamespace)}:${Boolean(browserNamespace)}`;
        if (proxyCache.has(cacheKey)) return proxyCache.get(cacheKey);

        const proxy = new Proxy(Object.create(null), {
            get(_target, property) {
                const chromeValue = readProperty(chromeNamespace, property);
                const browserValue = readProperty(browserNamespace, property);

                if (
                    typeof chromeValue === 'function' ||
                    typeof browserValue === 'function'
                ) {
                    return (...args) => {
                        const hasCallback =
                            typeof args[args.length - 1] === 'function';
                        const useChrome =
                            hasCallback && typeof chromeValue === 'function';
                        const fn = useChrome
                            ? chromeValue
                            : typeof browserValue === 'function'
                              ? browserValue
                              : chromeValue;
                        const owner = useChrome
                            ? chromeNamespace
                            : fn === browserValue
                              ? browserNamespace
                              : chromeNamespace;

                        return Reflect.apply(fn, owner, args);
                    };
                }

                if (
                    isObjectLike(chromeValue) ||
                    isObjectLike(browserValue)
                ) {
                    return createNamespace(
                        chromeValue,
                        browserValue,
                        path ? `${path}.${String(property)}` : String(property),
                    );
                }

                return chromeValue !== undefined ? chromeValue : browserValue;
            },
        });

        proxyCache.set(cacheKey, proxy);
        return proxy;
    }

    return createNamespace(chromeApi, browserApi);
}

export const chrome = createExtensionApiCompat(nativeChrome, nativeBrowser);
