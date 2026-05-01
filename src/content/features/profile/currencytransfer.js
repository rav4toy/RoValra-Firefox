import { callRobloxApiJson } from '../../core/api.js';
import { getUserIdFromUrl } from '../../core/idExtractor.js';
import { launchDeeplink } from '../../core/utils/launcher.js';
import { showConfirmationPrompt } from '../../core/ui/confirmationPrompt.js';
import { t } from '../../core/locale/i18n.js';
import {
    registerProfileContextMenuAction,
    createContextMenuButton,
} from '../../core/ui/profile/contextMenu.js';

const transferStatusCache = new Map();

async function getCurrencyTransferStatus(userId) {
    if (transferStatusCache.has(userId)) {
        return transferStatusCache.get(userId);
    }

    const profileApiPayload = {
        profileId: userId,
        components: [
            {
                component: 'Actions',
            },
        ],
        profileType: 'User',
    };

    const statusPromise = (async () => {
        try {
            const profileResponse = await callRobloxApiJson({
                subdomain: 'apis',
                endpoint: '/profile-platform-api/v1/profiles/get',
                method: 'POST',
                body: profileApiPayload,
            });

            const actions =
                profileResponse?.components?.Actions?.contextual || [];

            return actions.includes('CurrencyTransfer');
        } catch (err) {
            console.error(
                'RoValra: Failed to fetch currency transfer status.',
                err,
            );
            transferStatusCache.delete(userId);
            return false;
        }
    })();

    transferStatusCache.set(userId, statusPromise);
    return statusPromise;
}

async function addCurrencyTransferButton(menu) {
    if (menu.dataset.rovalraCurrencyTransferBtnAdded) {
        return;
    }
    menu.dataset.rovalraCurrencyTransferBtnAdded = 'true';

    const userId = getUserIdFromUrl();
    if (!userId) return;

    const canTransfer = await getCurrencyTransferStatus(userId);
    if (!canTransfer) return;

    const { button } = createContextMenuButton(
        await t('profile.currencyTransfer', {
            defaultValue: 'Transfer Currency',
        }),
    );

    button.addEventListener('click', async () => {
        showConfirmationPrompt({
            title: await t('profile.currencyTransfer', {
                defaultValue: 'Transfer Currency',
            }),
            message: await t('profile.currencyTransferConfirmation', {
                defaultValue:
                    'This will open the Roblox client to complete the currency transfer.',
            }),
            confirmText: await t('profile.openClient', {
                defaultValue: 'Open Client',
            }),
            onConfirm: () => {
                const params = new URLSearchParams({
                    direction: 'send',
                    transferOrigination: 'Profile',
                    userId: userId,
                });
                launchDeeplink(
                    `roblox://navigation/currency_transfer?${params.toString()}`,
                );
            },
        });
    });

    const container = menu.querySelector('[role="group"]') || menu;
    const menuItems = container.querySelectorAll('[role="menuitem"]');

    if (menuItems.length > 0) {
        menuItems[0].insertAdjacentElement('afterend', button);
    } else {
        container.appendChild(button);
    }
}

export function init() {
    chrome.storage.local.get({ currencyTransferEnabled: true }, (settings) => {
        if (!settings.currencyTransferEnabled) return;

        registerProfileContextMenuAction(addCurrencyTransferButton, () => {
            const userId = getUserIdFromUrl();
            if (userId) getCurrencyTransferStatus(userId);
        });
    });
}
