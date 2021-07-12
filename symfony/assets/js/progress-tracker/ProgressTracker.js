import React from "react"
import ProgressTrackerList from "./ProgressTrackerList"
import ProgressTrackerCreator from "./ProgressTrackerCreatorControlledComponent"
import PropTypes from "prop-types"

export default function ProgressTracker(props) {

    const { gamesPlayed, onAddGamePlayed, successMessage } = props
    const calculateTotalTimePlayed = gamesPlayed => gamesPlayed.reduce((total, game) => total + game.completionTime, 0)

    return (
        <section>
            {successMessage && (
                <div className="alert alert-success" role="alert">
                    <span className="far fa-smile" aria-hidden="true"></span>
                    &nbsp;{successMessage}
                </div>
            )}
            <h1>Track your progress! <span>🤩️</span></h1>

            <ProgressTrackerCreator onAddGamePlayed={onAddGamePlayed} />

            <table className="table table-hover">
                <caption>List of games tracked</caption>
                <thead>
                <tr>
                    <th>Game</th>
                    <th>Achievements</th>
                    <th>Completion Time</th>
                    <th>Avg. Completion Time</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <ProgressTrackerList {...props} />
                <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <th>Est. time to clean backlog</th>
                    <th>{ calculateTotalTimePlayed(gamesPlayed) } hrs done</th>
                    <th>todo hrs remaining</th>
                    <td>&nbsp;</td>
                </tr>
                </tfoot>
            </table>
        </section>
    )
}

ProgressTracker.propTypes = {
    gamesPlayed: PropTypes.array.isRequired,
    onAddGamePlayed: PropTypes.func.isRequired,
    successMessage: PropTypes.string.isRequired
}