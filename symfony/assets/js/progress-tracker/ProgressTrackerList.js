import React from "react"

export default function ProgressTrackerList(props) {
    const { highlightedRowId, onRowClick } = props

    const gamesPlayed = [
        {id: 1, game: 'Conan', achievements: 36, hoursPlayed: 100},
        {id: 2, game: 'Darkest Dungeon', achievements: 45, hoursPlayed: 99},
        {id: 3, game: 'Battlefield', achievements: 12, hoursPlayed: 280}
    ]

    return(
        <tbody>
        {gamesPlayed.map((gamePlayed) => (
            <tr
                key={gamePlayed.id}
                className={highlightedRowId === gamePlayed.id ? 'bg-primary text-white' : ''}
                onClick={() => onRowClick(gamePlayed.id)}
            >
                <td>{ gamePlayed.game }</td>
                <td>{ gamePlayed.achievements }</td>
                <td>{ gamePlayed.hoursPlayed }</td>
                <td>todo ...</td>
            </tr>
        ))}
        </tbody>
    )
}