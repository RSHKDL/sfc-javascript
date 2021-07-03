import React, { Component } from "react"
import ProgressTracker from "./ProgressTracker"
import { v4 as uuid } from 'uuid'

export default class ProgressTrackerApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            highlightedRowId: null,
            gamesPlayed: [
                {id: uuid(), game: 'Conan', achievements: [36, 100], completionTime: 100},
                {id: uuid(), game: 'Darkest Dungeon', achievements: [45, 45], completionTime: 99},
                {id: uuid(), game: 'Battlefield 6', achievements: [12, 51], completionTime: 280}
            ]
        }

        //@see: https://symfonycasts.com/screencast/reactjs/callback-props
        this.handleRowClick = this.handleRowClick.bind(this)
        this.handleAddGamePlayed = this.handleAddGamePlayed.bind(this)
    }

    handleRowClick(gamePlayedId) {
        this.setState({highlightedRowId: gamePlayedId})
    }

    handleAddGamePlayed(game, time, achievements) {
        const newGamePlayed = {
            id: uuid(),
            game: game,
            achievements: [parseInt(achievements), 100], //@todo get the total achievement of a game
            completionTime: parseInt(time)
        }

        /**
         * @see https://symfonycasts.com/screencast/reactjs/immutable-state
         */
        this.setState(prevState => {
            const newGamesPlayed = [...prevState.gamesPlayed, newGamePlayed]
            return {gamesPlayed: newGamesPlayed}
        })
    }

    render() {
        return <ProgressTracker
            {...this.props}
            {...this.state}
            onRowClick={this.handleRowClick}
            onAddGamePlayed={this.handleAddGamePlayed}
        />
    }
}