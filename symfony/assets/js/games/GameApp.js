import React, { Component } from "react"
import Game from "./Game"
import { getGames } from "../api/game_api"

export default class GameApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            games: [],
            isLoaded: false
        }
    }

    componentDidMount() {
        getGames().then((data) => this.setState({
            games: data,
            isLoaded: true
        }))
    }

    render() {
        return <Game
            {...this.props}
            {...this.state}
        />
    }
}