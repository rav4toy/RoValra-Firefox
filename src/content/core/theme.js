// TODO get rid of this and replace it with better things

let cachedTheme = null;

export const getCurrentTheme = () => cachedTheme || 'light';

export const THEME_CONFIG = {
    light: {
        content: 'var(--rovalra-theme-content)',
        text: 'var(--rovalra-theme-text)',
        header: 'var(--rovalra-theme-header)',
        sliderOn: 'var(--rovalra-theme-sliderOn)',
        sliderOff: 'var(--rovalra-theme-sliderOff)',
        sliderButton: 'var(--rovalra-theme-sliderButton)',
        buttonText: 'var(--rovalra-theme-buttonText)',
        buttonBg: 'var(--rovalra-theme-buttonBg)',
        buttonHover: 'var(--rovalra-theme-buttonHover)',
        buttonActive: 'var(--rovalra-theme-buttonActive)',
        buttonBorder: 'var(--rovalra-theme-buttonBorder)',
        discordLink: 'var(--rovalra-theme-discordLink)',
        githubLink: 'var(--rovalra-theme-githubLink)',
        robloxLink: 'var(--rovalra-theme-robloxLink)',
    },
    dark: {
        content: 'var(--rovalra-theme-content)',
        text: 'var(--rovalra-theme-text)',
        header: 'var(--rovalra-theme-header)',
        sliderOn: 'var(--rovalra-theme-sliderOn)',
        sliderOff: 'var(--rovalra-theme-sliderOff)',
        sliderButton: 'var(--rovalra-theme-sliderButton)',
        buttonText: 'var(--rovalra-theme-buttonText)',
        buttonBg: 'var(--rovalra-theme-buttonBg)',
        buttonHover: 'var(--rovalra-theme-buttonHover)',
        buttonActive: 'var(--rovalra-theme-buttonActive)',
        buttonBorder: 'var(--rovalra-theme-buttonBorder)',
        discordLink: 'var(--rovalra-theme-discordLink)',
        githubLink: 'var(--rovalra-theme-githubLink)',
        robloxLink: 'var(--rovalra-theme-robloxLink)',
    },
    nighty: {
        content: 'var(--rovalra-theme-content)',
        text: 'var(--rovalra-theme-text)',
        header: 'var(--rovalra-theme-header)',
        sliderOn: 'var(--rovalra-theme-sliderOn)',
        sliderOff: 'var(--rovalra-theme-sliderOff)',
        sliderButton: 'var(--rovalra-theme-sliderButton)',
        buttonText: 'var(--rovalra-theme-buttonText)',
        buttonBg: 'var(--rovalra-theme-buttonBg)',
        buttonHover: 'var(--rovalra-theme-buttonHover)',
        buttonActive: 'var(--rovalra-theme-buttonActive)',
        buttonBorder: 'var(--rovalra-theme-buttonBorder)',
        discordLink: 'var(--rovalra-theme-discordLink)',
        githubLink: 'var(--rovalra-theme-githubLink)',
        robloxLink: 'var(--rovalra-theme-robloxLink)',
    },
    sunset: {
        content: 'var(--rovalra-theme-content)',
        text: 'var(--rovalra-theme-text)',
        header: 'var(--rovalra-theme-header)',
        sliderOn: 'var(--rovalra-theme-sliderOn)',
        sliderOff: 'var(--rovalra-theme-sliderOff)',
        sliderButton: 'var(--rovalra-theme-sliderButton)',
        buttonText: 'var(--rovalra-theme-buttonText)',
        buttonBg: 'var(--rovalra-theme-buttonBg)',
        buttonHover: 'var(--rovalra-theme-buttonHover)',
        buttonActive: 'var(--rovalra-theme-buttonActive)',
        buttonBorder: 'var(--rovalra-theme-buttonBorder)',
        discordLink: 'var(--rovalra-theme-discordLink)',
        githubLink: 'var(--rovalra-theme-githubLink)',
        robloxLink: 'var(--rovalra-theme-robloxLink)',
    },
    highcontrast: {
        content: 'var(--rovalra-theme-content)',
        text: 'var(--rovalra-theme-text)',
        header: 'var(--rovalra-theme-header)',
        sliderOn: 'var(--rovalra-theme-sliderOn)',
        sliderOff: 'var(--rovalra-theme-sliderOff)',
        sliderButton: 'var(--rovalra-theme-sliderButton)',
        buttonText: 'var(--rovalra-theme-buttonText)',
        buttonBg: 'var(--rovalra-theme-buttonBg)',
        buttonHover: 'var(--rovalra-theme-buttonHover)',
        buttonActive: 'var(--rovalra-theme-buttonActive)',
        buttonBorder: 'var(--rovalra-theme-buttonBorder)',
        discordLink: 'var(--rovalra-theme-discordLink)',
        githubLink: 'var(--rovalra-theme-githubLink)',
        robloxLink: 'var(--rovalra-theme-robloxLink)',
    },
    'custom-user': {
        content: 'var(--rovalra-theme-content)',
        text: 'var(--rovalra-theme-text)',
        header: 'var(--rovalra-theme-header)',
        sliderOn: 'var(--rovalra-theme-sliderOn)',
        sliderOff: 'var(--rovalra-theme-sliderOff)',
        sliderButton: 'var(--rovalra-theme-sliderButton)',
        buttonText: 'var(--rovalra-theme-buttonText)',
        buttonBg: 'var(--rovalra-theme-buttonBg)',
        buttonHover: 'var(--rovalra-theme-buttonHover)',
        buttonActive: 'var(--rovalra-theme-buttonActive)',
        buttonBorder: 'var(--rovalra-theme-buttonBorder)',
        discordLink: 'var(--rovalra-theme-discordLink)',
        githubLink: 'var(--rovalra-theme-githubLink)',
        robloxLink: 'var(--rovalra-theme-robloxLink)',
    },
};

export function withErrorHandling(fn, context = '') {
    return async (...args) => {
        try {
            return await fn(...args);
        } catch (error) {
            console.error(`Error in ${context}:`, error);
            return null;
        }
    };
}

function getThemeFromElement(element) {
    if (!element) return null;
    if (element.classList.contains('rovalra-custom-nighty-theme'))
        return 'nighty';
    if (element.classList.contains('rovalra-custom-sunset-theme'))
        return 'sunset';
    if (element.classList.contains('rovalra-custom-highcontrast-theme'))
        return 'highcontrast';
    if (element.classList.contains('rovalra-custom-user-theme'))
        return 'custom-user';
    if (element.classList.contains('dark-theme')) return 'dark';
    if (element.classList.contains('light-theme')) return 'light';
    return null;
}

function cacheTheme(theme) {
    if (!theme) return;

    cachedTheme = theme;
}

export function detectTheme() {
    const currentTheme = getThemeFromElement(document.body);
    if (currentTheme) {
        cacheTheme(currentTheme);
        return Promise.resolve(currentTheme);
    }

    return new Promise((resolve) => {
        const body = document.body;
        if (!body) {
            resolve(cachedTheme || 'light');
            return;
        }

        // This must be an independent observer. The shared RoValra attribute
        // observer stores one callback per element, so using it here could
        // replace (or be replaced by) the theme switcher's class listener.
        const observer = new MutationObserver(() => {
            const theme = getThemeFromElement(body);
            if (theme) {
                cacheTheme(theme);
                observer.disconnect();
                resolve(theme);
            }
        }); // Verified
        observer.observe(body, {
            attributes: true,
            attributeFilter: ['class'],
        });
    });
}

export function dispatchThemeEvent(theme) {
    cacheTheme(theme);
    const themeEvent = new CustomEvent('themeDetected', {
        detail: { theme },
    });
    window.dispatchEvent(themeEvent);
}

export const isDarkMode = () => {
    return document.body.classList.contains('dark-theme');
};
