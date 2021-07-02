import React, { Component } from "react"

export default class ProgressTracker extends Component {
    constructor(props) {
        super(props)

        this.state = {
            highlightedRowId: null
        }
    }

    handleRowClick(gamePlayedId, event) {
        this.setState({highlightedRowId: gamePlayedId})
    }

    render() {
        const gamesPlayed = [
            {id: 1, game: 'Conan', achievements: 36, hoursPlayed: 100},
            {id: 2, game: 'Darkest Dungeon', achievements: 45, hoursPlayed: 99},
            {id: 3, game: 'Battlefield', achievements: 12, hoursPlayed: 280}
        ]

        const { highlightedRowId } = this.state

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
                    <tbody>
                    {gamesPlayed.map((gamePlayed) => (
                        <tr
                            key={gamePlayed.id}
                            className={highlightedRowId === gamePlayed.id ? 'bg-primary text-white' : ''}
                            onClick={(event) => this.handleRowClick(gamePlayed.id, event)}
                        >
                            <td>{ gamePlayed.game }</td>
                            <td>{ gamePlayed.achievements }</td>
                            <td>{ gamePlayed.hoursPlayed }</td>
                            <td>todo ...</td>
                        </tr>
                    ))}
                    </tbody>
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
}