/**
 * Custom fetch method
 * Decode JSON but avoid issue with empty responses
 * Check status and throw error on specific http codes
 *
 * @returns {Promise<any | string>}
 */
function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin',
    }, options))
        .then(checkStatus)
        .then(response => response.text())
        .then(text => text ? JSON.parse(text) : '')
}

function checkStatus(response) {
    if (response.status >= 200 && response.status < 400) {
        return response
    }

    const error = new Error(response.statusText)
    error.response = response

    throw error
}

export function getGamesPlayed() {
    return fetchJson('/api/track-progress')
}

export function deleteGamePlayed(id) {
    return fetchJson(`/api/track-progress/${id}`, {
        method: 'DELETE'
    })
}

export function createGamePlayed(gamePlayed) {
    return fetchJson('/api/track-progress', {
        method: 'POST',
        body: JSON.stringify(gamePlayed),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}