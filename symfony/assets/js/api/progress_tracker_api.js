function fetchJson(url, options) {
    return fetch(url, Object.assign({
        credentials: 'same-origin',
    }, options))
        // Decode JSON but avoid issue with empty responses
        .then(response => response.text())
        .then(text => text ? JSON.parse(text) : '')
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