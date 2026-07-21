import i18next from 'i18next';

let i18nInitialized = false;

async function loadTranslations(language) {
    const response = await fetch(
        chrome.runtime.getURL(`public/Assets/locales/${language}.json`),
    );
    if (!response.ok) {
        throw new Error(
            `Could not load the ${language} locale (HTTP ${response.status}).`,
        );
    }
    return response.json();
}

async function initializeI18n(language, translations) {
    await i18next.init({
        lng: language,
        fallbackLng: 'en',
        debug: false,
        resources: {
            [language]: {
                translation: translations,
            },
        },
    });
}

const i18nPromise = (async () => {
    if (i18nInitialized) return;

    try {
        const settings = await new Promise(
            (resolve) => chrome.storage.local.get({ language: 'en' }, resolve), //Place holder in case that wasnt clear.
        );
        const language = settings.language || 'en';
        let selectedLanguage = language;
        let translations;

        try {
            translations = await loadTranslations(language);
        } catch (error) {
            if (language === 'en') throw error;
            console.warn(
                `RoValra: Could not load locale "${language}". Falling back to English.`,
                error,
            );
            selectedLanguage = 'en';
            translations = await loadTranslations('en');
        }

        await initializeI18n(selectedLanguage, translations);
        i18nInitialized = true;
    } catch (error) {
        console.error('RoValra: Failed to initialize i18n', error);
        await initializeI18n('en', {});
        i18nInitialized = true;
    }
})();

/**
 * Asynchronously gets a translation. This is the preferred method as it guarantees
 * the translation resources are loaded before returning a value.
 * @param {string} key The translation key.
 * @param {object} [options] i18next options.
 * @returns {Promise<string>} The translated string.
 */
export async function t(key, options) {
    await i18nPromise;
    return i18next.t(key, options);
}

/**
 * Synchronously gets a translation. If i18n is not yet initialized, it will
 * return the key itself as a fallback.
 * @param {string} key The translation key.
 * @param {object} [options] i18next options.
 * @returns {string} The translated string or the key if not available.
 */
export function ts(key, options) {
    const translated = i18next.t(key, options);
    return typeof translated === 'string' && translated
        ? translated
        : String(key);
}
