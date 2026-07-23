const FIREFOX_CHANGELOG_RESOURCE =
    'public/Assets/data/RuntimeData/changelog.md';

const FIREFOX_RELEASE_HEADER =
    /^\s*(?:\\?#{1,6}\s*)?v?(\d+(?:\.(?:\d+|p\d+))*)\s+firefox\s+(\d{1,2}\/\d{1,2}\/\d{4})\s*$/i;

function normalizeFirefoxChangelogBody(body) {
    return body
        .replace(
            /^[\t \u00a0]*(?:&#x20;)?[\t \u00a0]*\\?(#{1,6})[\t \u00a0]+/gmu,
            '$1 ',
        )
        .trim();
}

export function parseFirefoxChangelog(markdown) {
    const releases = [];
    let currentRelease = null;

    for (const line of String(markdown || '').split(/\r?\n/u)) {
        const header = line.match(FIREFOX_RELEASE_HEADER);
        if (header) {
            if (currentRelease) {
                currentRelease.body = normalizeFirefoxChangelogBody(
                    currentRelease.bodyLines.join('\n'),
                );
                delete currentRelease.bodyLines;
                releases.push(currentRelease);
            }

            const version = header[1];
            currentRelease = {
                source: 'firefox',
                name: `v${version}`,
                tag_name: `v${version}`,
                version,
                firefox_release_date: header[2],
                bodyLines: [],
            };
            continue;
        }

        if (currentRelease) currentRelease.bodyLines.push(line);
    }

    if (currentRelease) {
        currentRelease.body = normalizeFirefoxChangelogBody(
            currentRelease.bodyLines.join('\n'),
        );
        delete currentRelease.bodyLines;
        releases.push(currentRelease);
    }

    return releases;
}

function getVersionParts(release) {
    const value =
        release?.version ||
        release?.tag_name ||
        release?.name ||
        String(release);
    const match = String(value).match(/(?:^|[^\d])v?(\d+(?:\.(?:\d+|p\d+))*)/i);
    if (!match) return [];

    return match[1]
        .split('.')
        .map((part) => Number(part.replace(/^p/iu, '')))
        .map((part) => (Number.isFinite(part) ? part : 0));
}

export function compareChangelogVersions(left, right) {
    const leftParts = getVersionParts(left);
    const rightParts = getVersionParts(right);

    if (!leftParts.length) return rightParts.length ? 1 : 0;
    if (!rightParts.length) return -1;

    const partCount = Math.max(leftParts.length, rightParts.length);
    for (let index = 0; index < partCount; index += 1) {
        const difference = (rightParts[index] || 0) - (leftParts[index] || 0);
        if (difference !== 0) return difference;
    }

    return 0;
}

export function sortChangelogReleasesByVersion(releases) {
    return (Array.isArray(releases) ? releases : [])
        .map((release, originalIndex) => ({ release, originalIndex }))
        .sort(
            (left, right) =>
                compareChangelogVersions(left.release, right.release) ||
                left.originalIndex - right.originalIndex,
        )
        .map(({ release }) => release);
}

export async function loadFirefoxChangelogReleases() {
    const response = await fetch(
        chrome.runtime.getURL(FIREFOX_CHANGELOG_RESOURCE),
    ); // Verified
    if (!response.ok) {
        throw new Error(
            `Firefox changelog request failed with ${response.status}`,
        );
    }

    return parseFirefoxChangelog(await response.text());
}
