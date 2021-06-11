'use strict'

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

module.exports = Helper