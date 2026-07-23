import { debugVerbose, flush } from '../debug';
import { settings } from './getSettings';

type SettingsCompatResults = {
    replaced: string[];
    deleted: string[];
};

const normalizeResults = (message: unknown): SettingsCompatResults => {
    const result = message as Partial<SettingsCompatResults> | null;

    return {
        replaced: Array.isArray(result?.replaced)
            ? result.replaced.filter(
                  (value): value is string => typeof value === 'string',
              )
            : [],
        deleted: Array.isArray(result?.deleted)
            ? result.deleted.filter(
                  (value): value is string => typeof value === 'string',
              )
            : [],
    };
};

const handleResults = (message: unknown) => {
    debugVerbose(`settingsCompatResultData recieved data.`, message);

    const { replaced, deleted } = normalizeResults(message);

    (async () => {
        if ((await settings.settingChangeNote) !== true) return;

        if (replaced.length >= 1) {
            alert(`(RoValra) The following settings have been recently replaced or changed:
    *  ${replaced.join('\n\t*  ')}`);
            debugVerbose(
                `Replaced/changed ${replaced.length} settings.`,
                replaced,
            );
        }

        if (deleted.length >= 1) {
            alert(`(RoValra) The following settings have been recently deleted, locked or deprecated:
    *  ${deleted.join('\n    *  ')}`);
            debugVerbose(
                `Deleted/locked/deprecated ${deleted.length} settings.`,
                deleted,
            );
        }

        flush();
    })();
};

chrome.runtime.sendMessage({ type: 'settingsCompatGetRes' }, (message) => {
    if (chrome.runtime.lastError) {
        debugVerbose(
            `settingsCompatGetRes could not reach the background page.`,
            chrome.runtime.lastError.message,
        );
        return;
    }

    handleResults(message);
});

chrome.runtime.onMessage.addListener((message: any) => {
    if (message?.type !== 'settingsCompatResultData') return false;

    handleResults(message);
    return false;
});
