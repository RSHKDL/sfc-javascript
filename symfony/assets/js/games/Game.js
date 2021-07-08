import React from "react"
import GameList from "./GameList"

export default function Game(props) {
    return (
        <section>
            <table className="table table-hover">
                <caption>List of games</caption>
                <thead>
                <tr>
                    <th>Game</th>
                    <th>Achievements</th>
                    <th>Avg. Completion Time</th>
                    <th>Steam</th>
                </tr>
                </thead>
                <GameList {...props} />
            </table>
        </section>
    )
}