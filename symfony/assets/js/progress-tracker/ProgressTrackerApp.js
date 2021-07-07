import React, { Component } from "react"
import ProgressTracker from "./ProgressTracker"
import { v4 as uuid } from 'uuid'

export default class ProgressTrackerApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gamesPlayed: [
                {id: uuid(), game: 'Conan', achievements: [36, 100], completionTime: 100},
                {id: uuid(), game: 'Darkest Dungeon', achievements: [45, 45], completionTime: 99},
                {id: uuid(), game: 'Battlefield 6', achievements: [12, 51], completionTime: 280}
            ]
        }

        //@see: https://symfonycasts.com/screencast/reactjs/callback-props
        this.handleAddGamePlayed = this.handleAddGamePlayed.bind(this)
        this.handleDeleteGamePlayed = this.handleDeleteGamePlayed.bind(this)
    }

    handleAddGamePlayed(game, time, achievements) {
        const newGamePlayed = {
            id: uuid(),
            game: game,
            achievements: [achievements === '' ? 0 : parseInt(achievements), 100], //@todo get the total achievement of a game
            completionTime: time === '' ? 0 : parseInt(time)
        }

        /**
         * @see https://symfonycasts.com/screencast/reactjs/immutable-state
         */
        this.setState(prevState => {
            const newGamesPlayed = [...prevState.gamesPlayed, newGamePlayed]
            return {gamesPlayed: newGamesPlayed}
        })
    }

    handleDeleteGamePlayed(id) {
        this.setState((prevState) => {
            return {
                gamesPlayed: prevState.gamesPlayed.filter(gamePlayed => gamePlayed.id !== id)
            }
        })
    }

    render() {
        return <ProgressTracker
            {...this.props}
            {...this.state}
            onAddGamePlayed={this.handleAddGamePlayed}
            onDeleteGamePlayed={this.handleDeleteGamePlayed}
        />
    }
}