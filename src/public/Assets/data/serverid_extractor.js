/*!
 * rovalra v2.4.15.1
 * License: GPL-3.0
 * Repository: https://github.com/NotValra/RoValra
 * This extension is provided AS-IS without warranty.
 */
window.addEventListener('rovalra-extract-serverid-request', function(event) {
    // Unwrap _ff protocol used by the FF content script bridge
    let detail = event.detail;
    try {
        if (detail && detail._ff) detail = JSON.parse(detail._ff);
    } catch {}
    const extractionId = detail && detail.extractionId;

    function respond(serverId, error, extra) {
        window.dispatchEvent(new CustomEvent('rovalra-serverid-extracted', {
            detail: { _ff: JSON.stringify(Object.assign({ extractionId, serverId: serverId || null, error: error || null }, extra || {})) }
        }));
    }

    if (!extractionId) {
        respond(null, 'No extractionId');
        return;
    }

    try {
        const element = document.querySelector(`[data-rovalra-extraction-id="${extractionId}"]`);
        if (!element) {
            respond(null, 'Element not found');
            return;
        }

        const contextKeys = Object.keys(element);
        if (contextKeys.length === 0) {
            respond(null, 'Context has no keys');
            return;
        }

        const reactKey = contextKeys.find(key => key.startsWith('__reactFiber')) || contextKeys[0];
        const fiberNode = element[reactKey];

        if (!fiberNode) {
            respond(null, 'No fiber node');
            return;
        }

        if (!fiberNode.return || !fiberNode.return.memoizedProps) {
            respond(null, 'No memoizedProps');
            return;
        }

        const serverProps = fiberNode.return.memoizedProps;
        const serverId = serverProps.id;
        const accessCode = serverProps.accessCode;
        const privateServerId = serverProps.vipServerId;

        if (accessCode) element.setAttribute('data-access-code', accessCode);
        if (privateServerId) element.setAttribute('data-private-server-id', privateServerId);

        if (!serverId) {
            if (accessCode || privateServerId) {
                respond(null, null, { accessCode, privateServerId });
                return;
            }
            respond(null, 'No id in props');
            return;
        }

        respond(serverId, null, { accessCode, privateServerId });

    } catch (e) {
        respond(null, e.message);
    }
});
