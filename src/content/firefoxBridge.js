(() => {
    'use strict';

    const documentEvents = [
        'rovalra-group-roles-response',
        'rovalra-home-layout-categories',
        'rovalra-catalog-details-response',
        'rovalra-client-status-response',
        'rovalra-game-launch-success',
        'rovalra-game-servers-response',
        'rovalra-game-media-response',
        'rovalra-tradable-items-response',
        'rovalra-trades-list-response',
        'rovalra-trade-details-response',
    ];
    const windowEvents = [
        'rovalra-catalog-details',
        'rovalra-serverid-extracted',
    ];

    function rehydrateEvent(event) {
        if (typeof event.detail !== 'string') return;

        let detail;
        try {
            detail = JSON.parse(event.detail);
        } catch {
            return;
        }

        event.stopImmediatePropagation();
        event.currentTarget.dispatchEvent(
            new CustomEvent(event.type, {
                detail,
                bubbles: event.bubbles,
                cancelable: event.cancelable,
                composed: event.composed,
            }),
        );
    }

    for (const eventName of documentEvents) {
        document.addEventListener(eventName, rehydrateEvent, true);
    }
    for (const eventName of windowEvents) {
        window.addEventListener(eventName, rehydrateEvent, true);
    }
})();
