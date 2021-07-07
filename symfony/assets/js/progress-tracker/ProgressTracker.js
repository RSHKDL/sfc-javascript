import React from "react"
import ProgressTrackerList from "./ProgressTrackerList"
import ProgressTrackerCreator from "./ProgressTrackerCreatorControlledComponent"
import PropTypes from "prop-types"

export default function ProgressTracker(props) {

    const { gamesPlayed, onAddGamePlayed } = props
    const calculateTotalTimePlayed = gamesPlayed => gamesPlayed.reduce((total, game) => total + game.completionTime, 0)

    return (
        <section>
            <h1>Track your progress! <span>🤩️</span></h1>

            <ProgressTrackerCreator onAddGamePlayed={onAddGamePlayed} />

            <table className="table table-hover">
                <caption>List of games tracked</caption>
                <thead>
                <tr>
                    <th>What</th>
                    <th>Achievements</th>
                    <th>Time spent</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <ProgressTrackerList {...props} />
                <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <th>Total time spent</th>
                    <th>{ calculateTotalTimePlayed(gamesPlayed) } hrs</th>
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
}