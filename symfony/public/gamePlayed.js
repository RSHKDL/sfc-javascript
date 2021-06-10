(function (window, $, Routing, swal) {
    'use strict'
    class GamePlayed {
        constructor($wrapper) {
            this.$wrapper = $wrapper
            this.helper = new Helper(this.$wrapper)
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
                data.forEach((element) => {
                    this._addRow(element)
                })
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
            this.$wrapper.find('.js-total-hours-played').html(this.helper.getTotalHoursPlayedAsString())
        }

        handleNewFormSubmit(e) {
            e.preventDefault();
            const $form = $(e.currentTarget)
            const formData = {}
            $.each($form.serializeArray(), (key, fieldData) => {
                formData[fieldData.name] = fieldData.value
            })

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
                        console.log('now we are REALLY done')
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
            const deleteUrl = $link.data('url')
            const $row = $link.closest('tr')

            return $.ajax({
                url: deleteUrl,
                method: 'DELETE'
            }).then(() => {
                $row.fadeOut('slow', () => {
                    $row.remove()
                    this.updateTotalHoursPlayed()
                })
            })
        }

        _mapErrorsToForm(errorData) {
            const $form = this.$wrapper.find(GamePlayed._selectors.newGamePlayedForm)
            this._removeFormErrors()
            $form.find(':input').each((index, element) => {
                const fieldName = $(element).attr('name')
                const $wrapper = $(element).closest('.form-group')
                if (!errorData[fieldName]) {
                    // no error!
                    return
                }
                const $error = $('<span class="js-field-error text-danger"></span>')
                $error.html(errorData[fieldName])
                $wrapper.append($error)
                $wrapper.addClass('has-error')
            })
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
            const html = rowTemplate(gamePlayed)
            this.$wrapper.find('tbody').append($.parseHTML(html))
            this.updateTotalHoursPlayed()
        }
    }

    class Helper {
        constructor($wrapper) {
            this.$wrapper = $wrapper
        }

        calculateHoursPlayed() {
            return Helper._addHours(this.$wrapper.find('tbody tr'))
        }

        getTotalHoursPlayedAsString(maxHours = 9999) {
            let total = this.calculateHoursPlayed()
            if(total > maxHours) {
                total = maxHours + '+ hrs'
            }

            return total
        }

        static _addHours($elements) {
            let totalHours = 0
            $elements.each((index, element) => {
                totalHours += $(element).data('hours-played')
            })

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
                   data-url="${gamePlayed.links._self}"
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
