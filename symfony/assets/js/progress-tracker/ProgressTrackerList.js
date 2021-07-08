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

    const { gamesPlayed, onDeleteGamePlayed } = props

    const handleDeleteClick = (event, gamePlayedId) => {
        event.preventDefault()
        onDeleteGamePlayed(gamePlayedId)
    }

    return(
        <tbody>
        {gamesPlayed.map((gamePlayed) => (
            <tr key={gamePlayed.id}>
                <td>{ gamePlayed.game }</td>
                <td>{ displayAchievements(gamePlayed.achievements) }</td>
                <td>{ gamePlayed.completionTime }</td>
                <td>{ gamePlayed.avgTime }</td>
                <td>
                    <div className={"d-flex justify-content-evenly"}>
                        <a href="" className={"btn btn-secondary btn-sm"} aria-label={"Complete"}>
                            <span className="fas fa-clipboard-check" aria-hidden="true"></span>
                        </a>
                        <a href="" className={"btn btn-secondary btn-sm"} aria-label={"Edit"}>
                            <span className="fas fa-stopwatch" aria-hidden="true"></span>
                        </a>
                        <a
                            href=""
                            onClick={(event) => handleDeleteClick(event, gamePlayed.id)}
                            className={"btn btn-danger btn-sm"} aria-label={"Delete"}
                        >
                            <span className="fas fa-trash" aria-hidden="true"></span>
                        </a>
                    </div>
                </td>
            </tr>
        ))}
        </tbody>
    )
}

ProgressTrackerList.propTypes = {
    gamesPlayed: PropTypes.array.isRequired,
    onDeleteGamePlayed: PropTypes.func.isRequired
}