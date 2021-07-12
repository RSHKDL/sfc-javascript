import React, { Component } from "react"
import ProgressTracker from "./ProgressTracker"
import { v4 as uuid } from "uuid"
import { getGamesPlayed, deleteGamePlayed, createGamePlayed } from "../api/progress_tracker_api"

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

    handleAddGamePlayed(id, time, achievements) {
        const newGamePlayed = {
            //id: uuid(), //@todo we'll use uuid later
            game: parseInt(id),
            achievements: achievements === '' ? 0 : parseInt(achievements),
            completionTime: time === '' ? 0 : parseInt(time),
        }

        /**
         * @see https://symfonycasts.com/screencast/reactjs/immutable-state
         */
        createGamePlayed(newGamePlayed).then(newGamePlayed => {
            this.setState(prevState => {
                const newGamesPlayed = [...prevState.gamesPlayed, newGamePlayed]
                return {gamesPlayed: newGamesPlayed}
            })
        })
    }

    handleDeleteGamePlayed(id) {
        deleteGamePlayed(id) //@todo Promise return is ignored :(
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