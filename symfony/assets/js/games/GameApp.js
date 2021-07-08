import React, { Component } from "react"
import Game from "./Game"

export default class GameApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            games: [
                {id: 1111, game: 'Conan Exiles', achievements: 0, averageCompletionTime: 85},
                {id: 2222, game: 'Darkest Dungeon', achievements: 85, averageCompletionTime: 60},
                {id: 3333, game: 'Battlefield 6', achievements: 42, averageCompletionTime: null}
            ]
        }
    }

    render() {
        return <Game
            {...this.props}
            {...this.state}
        />
    }
}