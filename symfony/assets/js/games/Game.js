'use-strict'

import $ from "jquery"
import Routing from "../components/Routing"

class Game {
    constructor($wrapper, initialGames) {
        this.games = {}
        this.apiResponse = {}
        this.$wrapper = $wrapper

        /*for (let game of initialGames) {
            this._addRow(game)
        }*/

        this.$wrapper.on(
            'submit',
            Game._selectors.findGame,
            this.handleQueryGameFormSubmit.bind(this)
        )

        this.$wrapper.on(
            'click',
            Game._selectors.addGame,
            this.handleAddGame.bind(this)
        )
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
     * @private
     */
    static get _selectors() {
        return {
            findGame: '.js-find-game-form',
            foundGames: '.js-found-games',
            addGame: '.js-add-game'
        }
    }

    handleQueryGameFormSubmit(e) {
        e.preventDefault()
        const $form = $(e.currentTarget)
        const formData = {}
        for (const fieldData of $form.serializeArray()) {
            formData[fieldData.name] = fieldData.value
        }

        this._queryGames(formData)
            .then((data) => {
                this._clearForm()
                this._clearResults()
                this.apiResponse = data
                this._displayResults(this.apiResponse)
            }).catch((errorData) => {
                this._mapErrorsToForm(errorData.errors)
        })
    }

    /**
     *
     */
    handleAddGame(e) {
        e.preventDefault()
        const gameRawgId = e.currentTarget.parentNode.dataset.gameId
        const [game] = this.apiResponse.filter(item => item.rawgId.toString() === gameRawgId.toString())
        this._addGame(game)
            .then((data) => {
                console.log(data)
            }).catch((errorData) => {
                console.log(errorData)
        })
    }

    _queryGames(data) {
        return new Promise(function(resolve, reject) {
            $.ajax({
                url: Routing.generate('api_game_find'),
                method: 'POST',
                data: JSON.stringify(data)
            }).then((data, textStatus) => {
                resolve(data)
            }).catch((jqXHR) => {
                const errorData = JSON.parse(jqXHR.responseText)
                reject(errorData)
            })
        })
    }

    _displayResults(results) {
        const html = resultsTemplate(results)
        this.$wrapper.find(Game._selectors.foundGames).append($.parseHTML(html))
    }

    _addGame(game) {
        return new Promise(function (resolve, reject) {
            $.ajax({
                url: Routing.generate('api_game_add'),
                method: 'POST',
                data: JSON.stringify(game)
            }).then((data, textStatus) => {
                console.log('resolve:', data)
                resolve(data)
            }).catch((jqXHR) => {
                const errorData = JSON.parse(jqXHR.responseText)
                console.log('reject:', errorData)
                reject(errorData)
            })
        })
    }

    /**
     * @see https://developer.mozilla.org/en-US/docs/Web/API/Document/replaceChildren
     * @private
     */
    _clearResults() {
        this.apiResponse = {}
        document.querySelector(Game._selectors.foundGames).replaceChildren()
    }

    _mapErrorsToForm(errorData) {
        const $form = this.$wrapper.find(Game._selectors.findGame)
        this._removeFormErrors()
        for (const element of $form.find(':input')) {
            const fieldName = $(element).attr('name')
            const $wrapper = $(element).closest('.form-group')
            if (!errorData[fieldName]) {
                // no error!
                continue
            }
            const $error = $('<span class="js-field-error text-danger"></span>')
            $error.html(errorData[fieldName])
            $wrapper.append($error)
            $wrapper.addClass('has-error')
        }
    }

    _removeFormErrors() {
        const $form = this.$wrapper.find(Game._selectors.findGame)
        $form.find('.js-field-error').remove()
        $form.find('.form-group').removeClass('has-error')
    }

    _clearForm() {
        this._removeFormErrors()
        const $form = this.$wrapper.find(Game._selectors.findGame)
        $form[0].reset()
    }

    _addRow(game) {
        console.log('todo add row')
    }
}

const resultsTemplate = (results) => `
    <h3>We found ${results.length} result(s)</h3>
    <ul class="list-group">
        ${results.map(item => `
            <li class="list-group-item" data-game-id="${item.rawgId}">
                ${item.name}
                <a href="" class="js-add-game btn btn-success btn-sm float-end"><span class="fas fa-plus"></span>&nbsp;Add</a>
            </li>`
        ).join('')}
    </ul>
`

export default Game