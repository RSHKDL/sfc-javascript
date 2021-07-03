import React from "react"
import { render } from 'react-dom'
import ProgressTrackerApp from "./progress-tracker/ProgressTrackerApp"
import { Tooltip } from "bootstrap"

render(<ProgressTrackerApp/>, document.getElementById('progress-tracker-app'))

document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl))
}, false)