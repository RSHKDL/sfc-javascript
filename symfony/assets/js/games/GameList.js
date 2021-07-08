import React from "react"
import PropTypes from "prop-types"

export default function GameList(props) {

    const { games, isLoaded } = props

    if(!isLoaded) {
        return(
            <tbody>
                <tr>
                    <td colSpan="4" className="text-center" >
                        <span className="fas fa-circle-notch fa-spin" aria-hidden="true"></span>
                        &nbsp;Loading...
                    </td>
                </tr>
            </tbody>
        )
    }

    return(
        <tbody>
        {games.map((game) => (
            <tr key={game.id}>
                <td>{ game.name }</td>
                <td>{ game.achievements === 0 ? 'No achievements' : game.achievements }</td>
                <td>{ game.averageCompletionTime === null ? 'No data' : game.averageCompletionTime }</td>
                <td>todo steam link</td>
            </tr>
        ))}
        </tbody>
    )
}

GameList.propTypes = {
    games: PropTypes.array.isRequired,
    isLoaded: PropTypes.bool.isRequired
}