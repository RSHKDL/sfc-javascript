import React from "react"
import ProgressTrackerList from "./ProgressTrackerList"
import PropTypes from "prop-types"

export default function ProgressTracker(props) {
    const { highlightedRowId, onRowClick, gamesPlayed, onGamePlayedSubmit } = props
    const calculateTotalTimePlayed = gamesPlayed => gamesPlayed.reduce((total, game) => total + game.hoursPlayed, 0)

    function handleFormSubmit(event) {
        event.preventDefault()

        let test1 = event.target.elements.namedItem('item').value
        let test2 = event.target.elements.namedItem('completion_time').value
        let test3 = event.target.elements.namedItem('achievements').value

        onGamePlayedSubmit(test1, test2, test3)
    }

    return (
        <section>
            <h1>Track your progress! <span>🤩️</span></h1>
            <form className="row g-3 align-items-center" onSubmit={handleFormSubmit}>
                <div className="col">
                    <label className="visually-hidden" htmlFor="game_played_item">Game?</label>
                    <select id="game_played_item"
                            name="item"
                            required="required"
                            className="form-select">
                        <option value="">What did you played?</option>
                        <option value="conan">Conan</option>
                        <option value="darkest_dungeon">Darkest Dungeon</option>
                        <option value="battlefield">Battlefield</option>
                    </select>
                </div>
                {' '}
                <div className="col">
                    <label className="visually-hidden" htmlFor="game_played_time">Completion time?</label>
                    <input type="number"
                           id="game_played_time"
                           name="completion_time"
                           required="required"
                           placeholder="Completion time in hours"
                           className="form-control"/>
                </div>
                {' '}
                <div className="col">
                    <label className="visually-hidden" htmlFor="game_played_ach">Achievements?</label>
                    <input type="number"
                           id="game_played_ach"
                           name="achievements"
                           required="required"
                           placeholder="Achievements"
                           className="form-control"/>
                </div>
                {' '}
                <div className="col">
                    <button type="submit" className="btn btn-primary">
                        <span className="fas fa-thumbs-up" aria-hidden="true"></span>
                        &nbsp;Nailed it!
                    </button>
                </div>
            </form>
            <table className="table table-striped">
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
    highlightedRowId: PropTypes.any,
    gamesPlayed: PropTypes.array.isRequired,
    onRowClick: PropTypes.func.isRequired,
    onGamePlayedSubmit: PropTypes.func.isRequired,
}