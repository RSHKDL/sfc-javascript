(function (window, $, Routing) {
    'use strict'
    window.GamePlayed = function ($wrapper) {
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
            this._selectors.newGamePlayedForm,
            this.handleNewFormSubmit.bind(this)
        )
    }

    $.extend(GamePlayed.prototype, {
        _selectors: {
            newGamePlayedForm: '.js-new-game-played-form'
        },

        loadGamesPlayed: function () {
            let self = this
            $.ajax({
                url: Routing.generate('api_game_played_list'),
                success: function (data) {
                    data.forEach((element) => {
                        self._addRow(element)
                    })
                }
            })
        },

        handleGamePlayedDelete: function (e) {
            e.preventDefault()
            let $link = $(e.currentTarget)
            $link.find('.fa')
                .removeClass('fa-trash')
                .addClass('fa-spinner')
                .addClass('fa-spin')
            let deleteUrl = $link.data('url')
            let $row = $link.closest('tr')
            let self = this
            $.ajax({
                url: deleteUrl,
                method: 'DELETE',
                success: function () {
                    $row.fadeOut('slow', function () {
                        $row.remove()
                        self.updateTotalHoursPlayed()
                    })
                }
            })
        },

        handleRowClick: function () {
            console.log('row clicked!');
        },

        updateTotalHoursPlayed: function () {
            this.$wrapper.find('.js-total-hours-played').html(this.helper.calculateHoursPlayed())
        },

        handleNewFormSubmit: function(e) {
            e.preventDefault();
            let $form = $(e.currentTarget)
            let formData = {}
            $.each($form.serializeArray(), function(key, fieldData) {
                formData[fieldData.name] = fieldData.value
            })
            let self = this
            $.ajax({
                url: $form.data('url'),
                method: 'POST',
                data: JSON.stringify(formData),
                success: function (data) {
                    self._clearForm()
                    self._addRow(data)
                },
                error: function (jqXHR) {
                    let errorData = JSON.parse(jqXHR.responseText)
                    self._mapErrorsToForm(errorData.errors)
                }
            })
        },

        _mapErrorsToForm: function(errorData) {
            let $form = this.$wrapper.find(this._selectors.newGamePlayedForm)
            this._removeFormErrors()
            $form.find(':input').each(function() {
                let fieldName = $(this).attr('name')
                let $wrapper = $(this).closest('.form-group')
                if (!errorData[fieldName]) {
                    // no error!
                    return
                }
                let $error = $('<span class="js-field-error text-danger"></span>')
                $error.html(errorData[fieldName])
                $wrapper.append($error)
                $wrapper.addClass('has-error')
            })
        },

        _removeFormErrors: function () {
            let $form = this.$wrapper.find(this._selectors.newGamePlayedForm)
            $form.find('.js-field-error').remove()
            $form.find('.form-group').removeClass('has-error')
        },

        _clearForm: function () {
            this._removeFormErrors()
            let $form = this.$wrapper.find(this._selectors.newGamePlayedForm)
            $form[0].reset()
        },

        _addRow: function (gamePlayed) {
            let templateText = $('#js-game-played-row-template').html()
            let template = _.template(templateText) // _ underscore come from underscore.js
            let html = template(gamePlayed)
            this.$wrapper.find('tbody').append($.parseHTML(html))
            this.updateTotalHoursPlayed()
        }
    })

    let Helper = function ($wrapper) {
        this.$wrapper = $wrapper
    }

    $.extend(Helper.prototype, {
        calculateHoursPlayed: function () {
            let totalHoursPlayed = 0
            this.$wrapper.find('tbody tr').each(function () {
                totalHoursPlayed += $(this).data('hours-played')
            })

            return totalHoursPlayed
        }
    })
})(window, $, Routing) // self executing function
