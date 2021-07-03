import React, { Component } from "react"
import ProgressTracker from "./ProgressTracker";

export default class ProgressTrackerApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            highlightedRowId: null,
            gamesPlayed: [
                {id: 1, game: 'Conan', achievements: [36, 100], hoursPlayed: 100},
                {id: 2, game: 'Darkest Dungeon', achievements: [45, 45], hoursPlayed: 99},
                {id: 3, game: 'Battlefield 6', achievements: [12, 51], hoursPlayed: 280}
            ]
        }

        //@see: https://symfonycasts.com/screencast/reactjs/callback-props
        this.handleRowClick = this.handleRowClick.bind(this)
    }

    handleRowClick(gamePlayedId) {
        this.setState({highlightedRowId: gamePlayedId})
    }

    handleGamePlayedSubmit(game, time, achievements) {
        console.log('todo - handle this data: ', game, time, achievements)
    }

    render() {
        return <ProgressTracker
            {...this.props}
            {...this.state}
            onRowClick={this.handleRowClick}
            onGamePlayedSubmit={this.handleGamePlayedSubmit}
        />
    }
}