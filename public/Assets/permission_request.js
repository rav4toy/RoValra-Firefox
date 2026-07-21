(() => {
    'use strict';

    const params = new URLSearchParams(location.search);
    const requestId = params.get('requestId');
    let permissions = [];

    try {
        permissions = JSON.parse(params.get('permissions') || '[]');
    } catch {
        permissions = [];
    }

    permissions = [...new Set([].concat(permissions).filter(Boolean))];

    const list = document.getElementById('permission-list');
    for (const permission of permissions) {
        const item = document.createElement('li');
        item.textContent = permission;
        list.appendChild(item);
    }

    if (!permissions.length || !requestId) {
        document.getElementById('grant').disabled = true;
        const item = document.createElement('li');
        item.textContent = 'Invalid permission request';
        list.appendChild(item);
    }

    function reportResult(granted) {
        chrome.runtime.sendMessage(
            {
                action: 'permissionRequestResult',
                requestId,
                granted: Boolean(granted),
            },
            () => window.close(),
        );
    }

    document.getElementById('grant').addEventListener('click', () => {
        chrome.permissions.request({ permissions }, (granted) => {
            reportResult(granted && !chrome.runtime.lastError);
        });
    });

    document.getElementById('cancel').addEventListener('click', () => {
        reportResult(false);
    });
})();
