/**
 * Firefox content scripts can receive page-owned objects through Xray
 * wrappers. Clone API JSON into the extension compartment before consumers
 * sort, filter, or replace properties on it.
 */
export function cloneIntoExtensionRealm(value) {
    if (value === null || typeof value !== 'object') return value;

    if (typeof globalThis.structuredClone === 'function') {
        try {
            return globalThis.structuredClone(value);
        } catch {}
    }

    return JSON.parse(JSON.stringify(value));
}
