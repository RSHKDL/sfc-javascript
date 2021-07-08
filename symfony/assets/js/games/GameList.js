import React from "react"
import PropTypes from "prop-types"

export default function GameList(props) {

    const { games } = props

    return(
        <tbody>
        {games.map((game) => (
            <tr key={game.id}>
                <td>{ game.game }</td>
                <td>{ game.achievements === 0 ? 'No achievements' : game.achievements }</td>
                <td>{ game.averageCompletionTime === null ? 'No data' : game.averageCompletionTime }</td>
                <td>todo steam link</td>
            </tr>
        ))}
        </tbody>
    )
}

GameList.propTypes = {
    games: PropTypes.array.isRequired
}