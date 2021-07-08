/**
 * Return a Promise object with games data
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
 * credentials: 'same-origin' is default
 *
 * @returns {Promise<any>}
 */
export function getGames() {
    return fetch('/api/games')
        .then(response => response.json())
}