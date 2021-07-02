import React, { Component } from "react"
import ProgressTracker from "./ProgressTracker";

export default class ProgressTrackerApp extends Component {
    constructor(props) {
        super(props)

        this.state = {
            highlightedRowId: null
        }

        //@see: https://symfonycasts.com/screencast/reactjs/callback-props
        this.handleRowClick = this.handleRowClick.bind(this)
    }

    handleRowClick(gamePlayedId) {
        this.setState({highlightedRowId: gamePlayedId})
    }

    render() {
        const { highlightedRowId } = this.state

        return <ProgressTracker
            highlightedRowId={highlightedRowId}
            onRowClick={this.handleRowClick}
        />
    }
}