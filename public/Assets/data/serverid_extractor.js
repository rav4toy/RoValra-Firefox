(() => {
if (window.__ROVALRA_SERVERID_EXTRACTOR_SETUP__) return;
window.__ROVALRA_SERVERID_EXTRACTOR_SETUP__ = true;

const isFirefox = /Firefox\//i.test(navigator.userAgent);
const assignedAccessCodes = new Set();

function parseBridgeDetail(detail) {
    if (!isFirefox || typeof detail !== 'string') return detail;
    try {
        return JSON.parse(detail);
    } catch {
        return detail;
    }
}

function dispatchExtractionResult(detail) {
    window.dispatchEvent(
        new CustomEvent('rovalra-serverid-extracted', {
            detail: isFirefox ? JSON.stringify(detail) : detail,
        }),
    );
}

window.addEventListener('rovalra-extract-serverid-request', function (event) {
    const { extractionId } = parseBridgeDetail(event.detail) || {};
    if (!extractionId) return;

    try {
        const element = document.querySelector(
            `[data-rovalra-extraction-id="${extractionId}"]`,
        );
        if (!element) return;

        if (element.querySelector('.icon-filled-person-play')) {
            dispatchExtractionResult({
                extractionId,
                serverId: null,
                accessCode: null,
            });
            return;
        }

        const reactKey = Object.keys(element).find((k) =>
            k.startsWith('__reactFiber$'),
        );
        if (!reactKey) throw new Error('No React Fiber');

        let fiber = element[reactKey];
        let serverId = null;
        let accessCode = null;
        let vipServerId = null;
        let isOwner = false;
        let isFriendServer = false;

        const uuidRegex =
            /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

        const currentAssignedCode = element.getAttribute('data-access-code');
        const existingCodes = new Set(
            Array.from(document.querySelectorAll('[data-access-code]'))
                .map((el) => el.getAttribute('data-access-code'))
                .filter((c) => c && c !== currentAssignedCode),
        );

        const isUsedAccessCode = (code) => {
            return assignedAccessCodes.has(code) || existingCodes.has(code);
        };

        const findUUID = (
            obj,
            excludePredicate,
            maxDepth = 3,
            currentDepth = 0,
        ) => {
            if (!obj || currentDepth > maxDepth || typeof obj !== 'object') {
                if (typeof obj === 'string' && uuidRegex.test(obj)) {
                    return excludePredicate(obj) ? null : obj;
                }
                return null;
            }

            if (obj.$$typeof || obj instanceof HTMLElement) return null;

            const keys = Object.getOwnPropertyNames(obj);
            for (const key of keys) {
                try {
                    const val = obj[key];
                    if (typeof val === 'string' && uuidRegex.test(val)) {
                        if (!excludePredicate(val)) return val;
                    } else if (val && typeof val === 'object') {
                        const found = findUUID(
                            val,
                            excludePredicate,
                            maxDepth,
                            currentDepth + 1,
                        );
                        if (found) return found;
                    }
                } catch (e) {}
            }
            return null;
        };

        let currentFiber = fiber;
        let depth = 0;

        while (currentFiber && depth < 15) {
            const props = currentFiber.memoizedProps;

            if (props) {
                const potentialCandidates = [
                    props.accessCode,
                    props.gameId,
                    props.jobId,
                    props.server?.accessCode,
                    props.server?.id,
                    props.item?.accessCode,
                    props.item?.gameId,
                ];

                for (const candidate of potentialCandidates) {
                    if (
                        candidate &&
                        typeof candidate === 'string' &&
                        uuidRegex.test(candidate) &&
                        !isUsedAccessCode(candidate)
                    ) {
                        accessCode = candidate;

                        break;
                    }
                }

                if (props.vipServerId) vipServerId = props.vipServerId;
                if (props.isOwner) isOwner = !!props.isOwner;

                const handlerName = props.onJoinClick
                    ? 'onJoinClick'
                    : props.onClick
                      ? 'onClick'
                      : props.onJoin
                        ? 'onJoin'
                        : null;
                const joinHandler = props[handlerName];

                if (
                    !accessCode &&
                    joinHandler &&
                    !joinHandler.__rovalra_checked
                ) {
                    joinHandler.__rovalra_checked = true;

                    const handlerUUID = findUUID(
                        joinHandler,
                        isUsedAccessCode,
                        2,
                    );
                    if (handlerUUID) {
                        accessCode = handlerUUID;
                    }
                }

                if (!accessCode) {
                    const candidate = findUUID(props, isUsedAccessCode, 3);
                    if (candidate) {
                        accessCode = candidate;
                    }
                }

                if (!accessCode && currentFiber.memoizedState) {
                    let hook = currentFiber.memoizedState;
                    while (hook) {
                        const hookUUID = findUUID(
                            hook.memoizedState,
                            isUsedAccessCode,
                            2,
                        );
                        if (hookUUID) {
                            accessCode = hookUUID;

                            break;
                        }
                        hook = hook.next;
                    }
                }

                if (
                    typeof props.thumbnailTargetId === 'number' &&
                    props.thumbnailTargetId > 0
                ) {
                    isFriendServer = true;
                }

                if (!serverId) {
                    let rawKey =
                        currentFiber.key || props.id || props.server?.id;
                    if (rawKey && typeof rawKey === 'string') {
                        const candidate = rawKey.startsWith('.')
                            ? rawKey.slice(1)
                            : rawKey;
                        if (uuidRegex.test(candidate)) {
                            serverId = candidate;
                        }
                    }
                }
            }

            if (accessCode && serverId) break;
            currentFiber = currentFiber.return;
            depth++;
        }

        if (accessCode) {
            assignedAccessCodes.add(accessCode);
        }

        dispatchExtractionResult({
            extractionId,
            serverId,
            privateServerId: vipServerId,
            accessCode,
            isFriendServer,
            isOwner,
        });
    } catch (e) {
        console.error('Extraction failed:', e);
        dispatchExtractionResult({
            extractionId,
            serverId: null,
            error: e.message,
        });
    }
});

})();
