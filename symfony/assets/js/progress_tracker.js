'use strict'

import React from "react"
import { render } from "react-dom"
import ProgressTrackerApp from "./progress-tracker/ProgressTrackerApp"
import { Tooltip } from "bootstrap"

render(<ProgressTrackerApp {...window.PROGRESS_TRACKER_APP_PROPS} />, document.getElementById('progress-tracker-app'))

/**
 * Initialize all bootstrap Tooltips on document ready
 * @see https://getbootstrap.com/docs/5.0/components/tooltips/
 */
document.addEventListener('DOMContentLoaded', () => {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
    tooltipTriggerList.map((tooltipTriggerEl) => new Tooltip(tooltipTriggerEl))
}, false)