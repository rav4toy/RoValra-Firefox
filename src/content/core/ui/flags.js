import { getFirefoxSafeMediaUrl } from '../firefox/resources.js';

const ALLOWED_FLAG_SIZES = new Set(['w20', 'w40', 'w80', 'h20', 'h40']);
const TRANSPARENT_PIXEL =
    'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';
const flagUrlCache = new Map();

function normalizeCountryCode(countryCode) {
    if (typeof countryCode !== 'string') return null;
    const code = countryCode.trim().split('-')[0].toLowerCase();
    return /^[a-z]{2}$/.test(code) ? code : null;
}

export function buildFlagCdnUrl(countryCode, size = 'w80') {
    const code = normalizeCountryCode(countryCode);
    if (!code) return null;
    const safeSize = ALLOWED_FLAG_SIZES.has(size) ? size : 'w80';
    return `https://flagcdn.com/${safeSize}/${code}.png`;
}

export function getCountryFlagImageUrl(countryCode, size = 'w80') {
    const remoteUrl = buildFlagCdnUrl(countryCode, size);
    if (!remoteUrl) return Promise.resolve(null);

    if (!flagUrlCache.has(remoteUrl)) {
        const safeUrlPromise = getFirefoxSafeMediaUrl(remoteUrl, {
            fallbackToOriginal: false,
        })
            .then((safeUrl) => {
                if (typeof safeUrl === 'string' && safeUrl) return safeUrl;
                flagUrlCache.delete(remoteUrl);
                return null;
            })
            .catch((error) => {
                flagUrlCache.delete(remoteUrl);
                console.warn(
                    `RoValra: Failed to load country flag '${countryCode}'.`,
                    error,
                );
                return null;
            });
        flagUrlCache.set(remoteUrl, safeUrlPromise);
    }

    return flagUrlCache.get(remoteUrl);
}

export async function setCountryFlagImageSource(
    image,
    countryCode,
    size = 'w80',
) {
    if (!image) return null;

    const requestKey = `${normalizeCountryCode(countryCode) || ''}:${size}`;
    image.dataset.rovalraFlagRequest = requestKey;
    image.removeAttribute('srcset');
    image.src = TRANSPARENT_PIXEL;

    const safeUrl = await getCountryFlagImageUrl(countryCode, size);
    if (safeUrl && image.dataset.rovalraFlagRequest === requestKey) {
        image.src = safeUrl;
    }
    return safeUrl;
}
