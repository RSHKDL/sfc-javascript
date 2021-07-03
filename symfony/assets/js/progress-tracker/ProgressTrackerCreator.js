import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class ProgressTrackerCreator extends Component {
    constructor(props) {
        super(props)

        this.itemSelect = React.createRef()
        this.completionTimeInput = React.createRef()
        this.achievementsInput = React.createRef()

        this.state = {
            gameSelectState: null,
            completionTimeInputState: null,
            achievementsInputState: null,
            gameSelectFeedback: null,
            completionTimeInputFeedback: null,
            achievementsInputFeedback: null,
        }

        this.selectOptions = [
            { id: 'desperado_3', text: 'Desperado III' },
            { id: 'conan_exiles', text: 'Conan Exiles' },
            { id: 'darkest_dungeon', text: 'Darkest Dungeon' },
            { id: 'battlefield_6', text: 'Battlefield 6' },
        ]

        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }

    handleFormSubmit(event) {
        event.preventDefault()
        const { onAddGamePlayed } = this.props

        const itemSelect = this.itemSelect.current
        const completionTimeInput = this.completionTimeInput.current
        const achievementsInput = this.achievementsInput.current
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

        if (itemSelect.selectedIndex === 0) {
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

        if (completionTimeInput.value <= 0) {
            hasError = true
            this.setState({
                completionTimeInputFeedback: 'Please enter a value greater than 0',
                completionTimeInputState: 'invalid'
            })
        } else {
            this.setState({
                completionTimeInputFeedback: 'Looks good!',
                completionTimeInputState: 'valid'
            })
        }

        if (!achievementsInput.value || achievementsInput.value < 0) {
            hasError = true
            this.setState({
                achievementsInputFeedback: 'Please enter a value equal or greater than 0',
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
            itemSelect.options[itemSelect.selectedIndex].text,
            completionTimeInput.value,
            achievementsInput.value
        )

        // Reset the form
        itemSelect.selectedIndex = 0
        completionTimeInput.value = null
        achievementsInput.value = null

        // Reset the errors
        this.setState({
            gameSelectState: null,
            completionTimeInputState: null,
            achievementsInputState: null,
            gameSelectFeedback: null,
            completionTimeInputFeedback: null,
            achievementsInputFeedback: null,
        })
    }

    render() {
        const {
            gameSelectState,
            gameSelectFeedback,
            completionTimeInputState,
            completionTimeInputFeedback,
            achievementsInputState,
            achievementsInputFeedback,
        } = this.state

        return (
            <form className={`row g-3 align-items-center needs-validation`} onSubmit={this.handleFormSubmit}>
                <div className="col">
                    <label className="visually-hidden" htmlFor="game_played_item">Choose a game</label>
                    <select id="game_played_item"
                            ref={this.itemSelect}
                            className={`form-select is-${gameSelectState}`}>
                        <option value="">Choose a game</option>
                        {this.selectOptions.map(option => <option value={option.id} key={option.id}>{option.text}</option>)}
                    </select>
                    {gameSelectFeedback && <div className={`${gameSelectState}-feedback`}>{gameSelectFeedback}</div>}
                </div>
                {' '}
                <div className="col">
                    <label className="visually-hidden" htmlFor="game_played_time">Completion time?</label>
                    <input type="number"
                           id="game_played_time"
                           ref={this.completionTimeInput}
                           placeholder="Completion time in hours"
                           className={`form-control is-${completionTimeInputState}`}/>
                    {completionTimeInputFeedback && <div className={`${completionTimeInputState}-feedback`}>{completionTimeInputFeedback}</div>}
                </div>
                {' '}
                <div className="col">
                    <label className="visually-hidden" htmlFor="game_played_ach">Achievements?</label>
                    <input type="number"
                           id="game_played_ach"
                           ref={this.achievementsInput}
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
    onAddGamePlayed: PropTypes.func.isRequired
}