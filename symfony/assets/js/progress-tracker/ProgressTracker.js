import React from "react"
import ProgressTrackerList from "./ProgressTrackerList"
import PropTypes from "prop-types"

export default function ProgressTracker(props) {
    const { highlightedRowId, onRowClick } = props

    return (
        <section>
            <h1>Track your progress! <span>🤩️</span></h1>
            <form className="row g-3 align-items-center">
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
                           name="time_spent"
                           required="required"
                           placeholder="Completion time in hours"
                           className="form-control"/>
                </div>
                {' '}
                <div className="col">
                    <button type="submit" className="btn btn-primary">I Nailed it!</button>
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
                <ProgressTrackerList
                    highlightedRowId={highlightedRowId}
                    onRowClick={onRowClick}
                />
                <tfoot>
                <tr>
                    <td>&nbsp;</td>
                    <th>Total time spent</th>
                    <th>todo ...</th>
                    <td>&nbsp;</td>
                </tr>
                </tfoot>
            </table>
        </section>
    )
}

ProgressTracker.propTypes = {
    highlightedRowId: PropTypes.any,
    onRowClick: PropTypes.func.isRequired
}