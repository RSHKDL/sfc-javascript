import React from "react"
import PropTypes from "prop-types"

function displayAchievements([current, max]) {
    const percentage = (current / max) * 100
    const background = percentage === 100 ? 'bg-success' : 'bg-secondary'

    return (
        <span
            className={'badge ' + background}
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title={ current + ' on ' + max }>
            { percentage.toFixed() }%
        </span>
    )
}

export default function ProgressTrackerList(props) {
    const { highlightedRowId, onRowClick, gamesPlayed } = props

    return(
        <tbody>
        {gamesPlayed.map((gamePlayed) => (
            <tr
                key={gamePlayed.id}
                className={highlightedRowId === gamePlayed.id ? 'bg-primary text-white' : ''}
                onClick={() => onRowClick(gamePlayed.id)}
            >
                <td>{ gamePlayed.game }</td>
                <td>{ displayAchievements(gamePlayed.achievements) }</td>
                <td>{ gamePlayed.hoursPlayed }</td>
                <td>todo ...</td>
            </tr>
        ))}
        </tbody>
    )
}

ProgressTrackerList.propTypes = {
    highlightedRowId: PropTypes.any,
    gamesPlayed: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired,
}