export function getGamesPlayed() {
    return fetch('/api/track-progress')
        .then(response => response.json())
}