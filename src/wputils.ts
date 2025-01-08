import { getLatestBranchVersion, getLatestVersion } from './wpapi';

const NIGHTLY_BUILD_URL = 'https://wordpress.org/nightly-builds/wordpress-latest.zip';
const WORDPRESS_URL = 'https://wordpress.org/wordpress-';

/**
 * Resolve the WordPress version.
 *
 * @async
 * @param {string} version The version to resolve.
 * @returns {Promise<string>} The resolved version.
 */
export function resolveWordPressVersion(version: string): Promise<string> {
    if (version === 'nightly' || version === 'trunk') {
        return Promise.resolve('nightly');
    }

    if (version === 'latest') {
        return getLatestVersion();
    }

    if (version.endsWith('.x')) {
        return getLatestBranchVersion(version.slice(0, -2));
    }

    return Promise.resolve(version);
}

/**
 * Get the WordPress download URL.
 *
 * @param {string} version The version to get the download URL for.
 * @returns {string} The download URL.
 */
export function getWordPressDownloadUrl(version: string): string {
    if (version === 'nightly') {
        return NIGHTLY_BUILD_URL;
    }

    return `${WORDPRESS_URL}${version}.zip`;
}

/**
 *
 * @param {string} version The version to get the test library base URL for.
 * @returns {string} The test library github zip archive URL.
 */
export function getWordPressTestLibraryBaseUrlGithub(version: string): string {
    const tag = version === 'nightly' ? 'heads/trunk' : `tags/${version}`;
    return `https://github.com/WordPress/wordpress-develop/archive/refs/${tag}.zip`;
}
