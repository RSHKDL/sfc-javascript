'use strict'

import $ from "jquery"
import GamePlayed from "./progress-tracker/game-played"

$(document).ready(function() {
    let $wrapper = $('.js-game-played-wrapper')
    new GamePlayed($wrapper, $wrapper.data('games-played'))
})