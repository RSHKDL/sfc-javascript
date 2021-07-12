import React, { Component } from "react"
import ProgressTracker from "./ProgressTracker"
import { v4 as uuid } from "uuid"
import { getGamesPlayed, deleteGamePlayed, createGamePlayed } from "../api/progress_tracker_api"

export default class ProgressTrackerApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gamesPlayed: [],
            isLoaded: false,
            isSavingNewGamePlayed: false,
            successMessage: ''
        }

        this.successMessageTimeoutHandle = 0

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

    componentWillUnmount() {
        clearTimeout(this.successMessageTimeoutHandle)
    }

    /**
     * https://symfonycasts.com/screencast/reactjs/success-messages
     * @param message
     */
    setSuccessMessage(message) {
        this.setState({successMessage: message})
        clearTimeout(this.successMessageTimeoutHandle)
        this.successMessageTimeoutHandle = setTimeout(() => {
            this.setState({successMessage: ''})
            this.successMessageTimeoutHandle = 0
        }, 1500)
    }

    handleAddGamePlayed(id, time, achievements) {
        const newGamePlayed = {
            //id: uuid(), //@todo we'll use uuid later
            game: parseInt(id),
            achievements: achievements === '' ? 0 : parseInt(achievements),
            completionTime: time === '' ? 0 : parseInt(time),
        }

        this.setState({isSavingNewGamePlayed: true})

        /**
         * @see https://symfonycasts.com/screencast/reactjs/immutable-state
         */
        createGamePlayed(newGamePlayed).then(newGamePlayed => {
            this.setState(prevState => {
                const newGamesPlayed = [...prevState.gamesPlayed, newGamePlayed]
                return {
                    gamesPlayed: newGamesPlayed,
                    isSavingNewGamePlayed: false
                }
            })

            this.setSuccessMessage('Progress tracked!')
        })
    }

    /**
     * First modify an object inside the state without mutating it
     * Then remove the item without mutating the state:
     * filter return a new array
     *
     * @see https://symfonycasts.com/screencast/reactjs/deep-state-update
     */
    handleDeleteGamePlayed(id) {
        this.setState((prevState) => {
            return {
                gamesPlayed: prevState.gamesPlayed.map(gamePlayed => {
                    if (gamePlayed.id !== id) {
                        return gamePlayed
                    }

                    return Object.assign({}, gamePlayed, {isDeleting: true})
                })
            }
        })

        deleteGamePlayed(id).then(() => {
            this.setState((prevState) => {
                return {
                    gamesPlayed: prevState.gamesPlayed.filter(gamePlayed => gamePlayed.id !== id)
                }
            })
            this.setSuccessMessage('Progress un-tracked!')
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