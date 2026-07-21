let isFirefoxCache;

export function isFirefox() {
    if (isFirefoxCache !== undefined) return isFirefoxCache;

    try {
        isFirefoxCache = chrome.runtime
            .getURL('')
            .startsWith('moz-extension://');
    } catch {
        isFirefoxCache = /Firefox\//i.test(navigator.userAgent);
    }

    return isFirefoxCache;
}

export function dispatchPageEvent(target, eventName, detail) {
    let eventDetail = detail;

    if (isFirefox() && detail !== undefined) {
        try {
            eventDetail = JSON.stringify(detail);
        } catch (error) {
            console.warn(
                `RoValra: Could not serialize page event '${eventName}'.`,
                error,
            );
        }
    }

    return target.dispatchEvent(
        new CustomEvent(eventName, { detail: eventDetail }),
    );
}
