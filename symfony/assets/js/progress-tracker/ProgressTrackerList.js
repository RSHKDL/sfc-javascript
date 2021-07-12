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

    const { gamesPlayed, isLoaded, onDeleteGamePlayed, isSavingNewGamePlayed } = props

    const handleDeleteClick = (event, gamePlayedId) => {
        event.preventDefault()
        onDeleteGamePlayed(gamePlayedId)
    }

    if(!isLoaded) {
        return(
            <tbody>
            <tr>
                <td colSpan="5" className="text-center" >
                    <span className="fas fa-circle-notch fa-spin" aria-hidden="true"></span>
                    &nbsp;Loading...
                </td>
            </tr>
            </tbody>
        )
    }

    return(
        <tbody>
        {gamesPlayed.map((gamePlayed) => (
            <tr key={gamePlayed.id}
                style={{
                    opacity: gamePlayed.isDeleting ? .3 : 1
                }}
            >
                <td>{ gamePlayed.game }</td>
                <td>{ displayAchievements(gamePlayed.achievements) }</td>
                <td>{ gamePlayed.completionTime }</td>
                <td>{ gamePlayed.averageCompletionTime === null ? 'no data' : gamePlayed.averageCompletionTime }</td>
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
        {isSavingNewGamePlayed && (
            <tr>
                <td colSpan="5" className="text-center" >
                    <span className="fas fa-circle-notch fa-spin" aria-hidden="true"></span>
                    &nbsp;Saving progress to the database...
                </td>
            </tr>
        )}
        </tbody>
    )
}

ProgressTrackerList.propTypes = {
    gamesPlayed: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired,
    isSavingNewGamePlayed: PropTypes.bool.isRequired,
    onDeleteGamePlayed: PropTypes.func.isRequired
}