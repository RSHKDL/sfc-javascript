import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProgressTrackerCreator extends Component {
    constructor(props) {
        super(props)

        this.state = {
            gameSelectId: '',
            completionTimeValue: '',
            achievementsValue: '',
            gameSelectState: null,
            completionTimeInputState: null,
            achievementsInputState: null,
            gameSelectFeedback: null,
            completionTimeInputFeedback: null,
            achievementsInputFeedback: null,
        }

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleGameSelectIdChange = this.handleGameSelectIdChange.bind(this)
        this.handleCompletionTimeValueChange = this.handleCompletionTimeValueChange.bind(this)
        this.handleAchievementsValueChange = this.handleAchievementsValueChange.bind(this)
    }

    handleFormSubmit(event) {
        event.preventDefault()
        const { onAddGamePlayed } = this.props
        const {
            gameSelectId,
            completionTimeValue,
            achievementsValue
        } = this.state

        let hasError = false

        // Reset the errors
        this.setState({
            gameSelectState: null,
            completionTimeInputState: null,
            achievementsInputState: null,
            gameSelectFeedback: null,
            completionTimeInputFeedback: null,
            achievementsInputFeedback: null,
        })

        if (gameSelectId === '') {
            hasError = true
            this.setState({
                gameSelectFeedback: 'Please select a game',
                gameSelectState: 'invalid'
            })
        } else {
            this.setState({
                gameSelectFeedback: 'Looks good!',
                gameSelectState: 'valid'
            })
        }

        if (completionTimeValue < 0) {
            hasError = true
            this.setState({
                completionTimeInputFeedback: 'Completion time must be positive',
                completionTimeInputState: 'invalid'
            })
        } else {
            this.setState({
                completionTimeInputFeedback: 'Looks good!',
                completionTimeInputState: 'valid'
            })
        }

        if (achievementsValue < 0) {
            hasError = true
            this.setState({
                achievementsInputFeedback: 'Achievements number must be positive',
                achievementsInputState: 'invalid'
            })
        } else {
            this.setState({
                achievementsInputFeedback: 'Looks good!',
                achievementsInputState: 'valid'
            })
        }

        if(hasError) {
            // don't submit, or clear the form
            return
        }

        onAddGamePlayed(
            gameSelectId,
            completionTimeValue,
            achievementsValue
        )

        // Reset the errors & the form
        this.setState({
            gameSelectId: '',
            completionTimeValue: '',
            achievementsValue: '',
            gameSelectState: null,
            completionTimeInputState: null,
            achievementsInputState: null,
            gameSelectFeedback: null,
            completionTimeInputFeedback: null,
            achievementsInputFeedback: null,
        })
    }

    handleGameSelectIdChange(event) {
        this.setState({gameSelectId: event.target.value})
    }

    handleCompletionTimeValueChange(event) {
        this.setState({completionTimeValue: event.target.value})
    }

    handleAchievementsValueChange(event) {
        this.setState({achievementsValue: event.target.value})
    }

    render() {
        const {
            gameSelectId,
            gameSelectState,
            gameSelectFeedback,
            completionTimeValue,
            completionTimeInputState,
            completionTimeInputFeedback,
            achievementsValue,
            achievementsInputState,
            achievementsInputFeedback,
        } = this.state

        const { validationErrorMessage, trackableGames } = this.props

        return (
            <form className={`row g-3 align-items-center needs-validation`} onSubmit={this.handleFormSubmit}>
                { validationErrorMessage && (
                    <div className="alert alert-danger">
                        <span className="far fa-frown" aria-hidden="true"></span>
                        &nbsp;{ validationErrorMessage }
                    </div>
                )}
                <div className="col">
                    <label className="visually-hidden" htmlFor="game_played_item">Choose a game</label>
                    <select id="game_played_item"
                            value={gameSelectId}
                            onChange={this.handleGameSelectIdChange}
                            className={`form-select is-${gameSelectState}`}>
                        <option value="">Choose a game</option>
                        {trackableGames.map(option => <option value={option.id} key={option.id}>{option.text}</option>)}
                    </select>
                    {gameSelectFeedback && <div className={`${gameSelectState}-feedback`}>{gameSelectFeedback}</div>}
                </div>
                {' '}
                <div className="col">
                    <label className="visually-hidden" htmlFor="game_played_time">Completion time?</label>
                    <input type="number"
                           id="game_played_time"
                           value={completionTimeValue}
                           onChange={this.handleCompletionTimeValueChange}
                           placeholder="Completion time in hours"
                           className={`form-control is-${completionTimeInputState}`}/>
                    {completionTimeInputFeedback && <div className={`${completionTimeInputState}-feedback`}>{completionTimeInputFeedback}</div>}
                </div>
                {' '}
                <div className="col">
                    <label className="visually-hidden" htmlFor="game_played_ach">Achievements?</label>
                    <input type="number"
                           id="game_played_ach"
                           value={achievementsValue}
                           onChange={this.handleAchievementsValueChange}
                           placeholder="Achievements"
                           className={`form-control is-${achievementsInputState}`}/>
                    {achievementsInputFeedback && <div className={`${achievementsInputState}-feedback`}>{achievementsInputFeedback}</div>}
                </div>
                {' '}
                <div className="col">
                    <button type="submit" className="btn btn-primary">
                        <span className="fas fa-crosshairs" aria-hidden="true"></span>
                        &nbsp;Track it!
                    </button>
                </div>
            </form>
        )
    }
}

ProgressTrackerCreator.propTypes = {
    onAddGamePlayed: PropTypes.func.isRequired,
    validationErrorMessage: PropTypes.string.isRequired,
    trackableGames: PropTypes.array.isRequired
}