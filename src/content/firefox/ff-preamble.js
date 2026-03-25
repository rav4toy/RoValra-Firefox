/**
 * Firefox-specific preamble for content.js
 * 
 * - Injects intercept.js into the page's MAIN world via a <script> tag
 *   (Firefox supports world: "MAIN" in content_scripts since FF 102, but
 *    this dynamic injection approach is used for compatibility/timing reasons)
 * - Provides dispatchCrossWorldEvent() helper that uses cloneInto() on Firefox
 *   to safely pass objects across the content/page script boundary
 */

(function injectInterceptScript() {
    if (document.__rovalraInterceptInjected) return;
    document.__rovalraInterceptInjected = true;
    try {
        const s = document.createElement('script');
        s.src = chrome.runtime.getURL('intercept.js');
        (document.head || document.documentElement).appendChild(s);
    } catch (e) {}
})();

function dispatchCrossWorldEvent(target, eventName, detail) {
    if (typeof cloneInto !== 'undefined' && detail !== undefined) {
        target.dispatchEvent(new CustomEvent(eventName, { detail: cloneInto(detail, window.wrappedJSObject || window) }));
    } else if (detail !== undefined) {
        target.dispatchEvent(new CustomEvent(eventName, { detail }));
    } else {
        target.dispatchEvent(new CustomEvent(eventName));
    }
}
