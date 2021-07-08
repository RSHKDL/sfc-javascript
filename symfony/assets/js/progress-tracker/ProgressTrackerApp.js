import React, { Component } from "react"
import ProgressTracker from "./ProgressTracker"
import { v4 as uuid } from "uuid"
import { getGamesPlayed } from "../api/progress_tracker_api"

export default class ProgressTrackerApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gamesPlayed: [],
            isLoaded: false
        }

        //@see: https://symfonycasts.com/screencast/reactjs/callback-props
        this.handleAddGamePlayed = this.handleAddGamePlayed.bind(this)
        this.handleDeleteGamePlayed = this.handleDeleteGamePlayed.bind(this)
    }

    componentDidMount() {
        getGamesPlayed().then((data) => this.setState({
            gamesPlayed: data,
            isLoaded: true
        }))
    }

    handleAddGamePlayed(game, time, achievements) {
        const newGamePlayed = {
            id: uuid(),
            game: game,
            achievements: [achievements === '' ? 0 : parseInt(achievements), 100], //@todo get the total achievement of a game
            completionTime: time === '' ? 0 : parseInt(time),
            avgTime: 85 //@todo get the average time to complete
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