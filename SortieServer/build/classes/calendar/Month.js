"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Month {
    /**
     * Class used to represent a month in a year
     * @param weeks
     * @param special
     */
    constructor(weeks, special) {
        this.weeks = weeks;
        this.special = special;
    }
    /**
     * Get the number of days in the month
     */
    getDayNum() {
        let count = 0;
        for (var week in this.weeks) {
            for (var day in this.weeks[week].days) {
                count += 1;
            }
        }
        return count;
    }
}
exports.Month = Month;
