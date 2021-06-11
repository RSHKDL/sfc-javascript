(function (window, $, Routing, swal) {
    'use strict'

    let HelperInstances = new WeakMap()

    class GamePlayed {
        constructor($wrapper) {
            this.gamesPlayed = {}
            this.$wrapper = $wrapper
            HelperInstances.set(this, new Helper(this.gamesPlayed))
            this.loadGamesPlayed()

            this.$wrapper.on(
                'click',
                '.js-delete-game-played',
                this.handleGamePlayedDelete.bind(this)
            )

            this.$wrapper.on(
                'click',
                'tbody tr',
                this.handleRowClick.bind(this)
            )

            this.$wrapper.on(
                'submit',
                GamePlayed._selectors.newGamePlayedForm,
                this.handleNewFormSubmit.bind(this)
            )
        }

        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get
         * @returns {{newGamePlayedForm: string}}
         * @private
         */
        static get _selectors() {
            return {
                newGamePlayedForm: '.js-new-game-played-form'
            }
        }

        loadGamesPlayed() {
            $.ajax({
                url: Routing.generate('api_game_played_list'),
            }).then((data) => {
                for (let gamePlayed of data) {
                    this._addRow(gamePlayed)
                }
            })
        }

        handleGamePlayedDelete(e) {
            e.preventDefault()
            const $link = $(e.currentTarget)
            swal({
                title: 'Delete this game?',
                text: 'What? Did you not actually finish this?',
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: () => this._deleteGamePlayed($link) // w/o curly braces this value will be returned!
            }).catch((reason) => {
                // nothing to do here, the catch could be removed
                console.log('cancelled!', reason)
            })
        }

        handleRowClick() {
            console.log('row clicked!');
        }

        updateTotalHoursPlayed() {
            this.$wrapper.find('.js-total-hours-played').html(HelperInstances.get(this).getTotalHoursPlayedAsString())
        }

        handleNewFormSubmit(e) {
            e.preventDefault();
            const $form = $(e.currentTarget)
            const formData = {}
            for (let fieldData of $form.serializeArray()) {
                formData[fieldData.name] = fieldData.value
            }

            this._saveGamePlayed(formData)
                .then((data) => {
                    this._clearForm()
                    this._addRow(data)
                }).catch((errorData) => {
                this._mapErrorsToForm(errorData.errors)
            })
        }

        _saveGamePlayed(data) {
            return new Promise(function(resolve, reject) {
                const url = Routing.generate('api_game_played_create')
                $.ajax({
                    url, // key and value are the same
                    method: 'POST',
                    data: JSON.stringify(data)
                }).then((data, textStatus, jqXHR) => {
                    $.ajax({
                        url: jqXHR.getResponseHeader('Location')
                    }).then((data) => {
                        resolve(data)
                    })
                }).catch((jqXHR) => {
                    let errorData = JSON.parse(jqXHR.responseText)
                    reject(errorData)
                })
            })
        }

        _deleteGamePlayed($link) {
            $link.find('.fa')
                .removeClass('fa-trash')
                .addClass('fa-spinner')
                .addClass('fa-spin')
            const id = $link.data('id')
            const url = Routing.generate('api_game_played_delete', {id: id})
            const $row = $link.closest('tr')

            return $.ajax({
                url,
                method: 'DELETE'
            }).then(() => {
                $row.fadeOut('slow', () => {
                    $row.remove()
                    delete this.gamesPlayed[id]
                    this.updateTotalHoursPlayed()
                })
            })
        }

        _mapErrorsToForm(errorData) {
            const $form = this.$wrapper.find(GamePlayed._selectors.newGamePlayedForm)
            this._removeFormErrors()
            for (let element of $form.find(':input')) {
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
            const $form = this.$wrapper.find(GamePlayed._selectors.newGamePlayedForm)
            $form.find('.js-field-error').remove()
            $form.find('.form-group').removeClass('has-error')
        }

        _clearForm() {
            this._removeFormErrors()
            const $form = this.$wrapper.find(GamePlayed._selectors.newGamePlayedForm)
            $form[0].reset()
        }

        _addRow(gamePlayed) {
            this.gamesPlayed[gamePlayed.id] = gamePlayed
            const html = rowTemplate(gamePlayed)
            this.$wrapper.find('tbody').append($.parseHTML(html))
            this.updateTotalHoursPlayed()
        }
    }

    class Helper {
        constructor(gamesPlayed) {
            this.gamesPlayed = gamesPlayed
        }

        calculateHoursPlayed() {
            return Helper._addHours(this.gamesPlayed)
        }

        getTotalHoursPlayedAsString(maxHours = 9999) {
            let total = this.calculateHoursPlayed()
            if(total > maxHours) {
                total = maxHours + '+ hrs'
            }

            return total + ' hrs'
        }

        /**
         * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/is_not_iterable
         * Also, we use gamePlayed[1] because [0] refers to Object.keys
         * @param gamesPlayed
         * @returns {number}
         * @private
         */
        static _addHours(gamesPlayed) {
            let totalHours = 0
            for (let gamePlayed of Object.entries(gamesPlayed)) {
                totalHours += gamePlayed[1].timeSpentToComplete
            }

            return totalHours
        }
    }

    const rowTemplate = (gamePlayed) => `
    <tr data-hours-played="${gamePlayed.timeSpentToComplete}">
            <td>${gamePlayed.game}</td>
            <td>to do</td>
            <td>${gamePlayed.timeSpentToComplete}</td>
            <td>
                <a href="#"
                   class="js-delete-game-played text-danger text-decoration-none"
                   data-id="${gamePlayed.id}"
                >
                    <span class="fa fa-trash" aria-hidden="true"></span>
                    &nbsp;Delete
                </a>
            </td>
        </tr>
    `

    // Export the class to the global scope!
    window.GamePlayed = GamePlayed
})(window, $, Routing, swal) // self executing function
