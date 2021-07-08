'use strict'

import $ from "jquery"
import Game from "./games/game-legacy"
import React from "react"
import { render } from "react-dom"
import GameApp from "./games/GameApp";

$(document).ready(function() {
    let $wrapper = $('.js-games-wrapper')
    new Game($wrapper, {})
})

render(<GameApp/>, document.getElementById('game-app'))