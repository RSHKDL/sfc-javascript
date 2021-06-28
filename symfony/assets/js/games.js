'use strict'

import $ from "jquery"
import Game from "./games/Game"

$(document).ready(function() {
    let $wrapper = $('.js-games-wrapper')
    new Game($wrapper, {})
})