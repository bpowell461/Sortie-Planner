const Day = require('../calendar/day');

module.exports = class ValidSample {
    static check(day) {
        var flag = 1;

        // We might make a general validator class that has functions useful for checking logic

        /* Some ternary operators to check logic conditions */
        flag = (day.num == 21) && flag ? 1 : 0;
        flag = (day.dayName == 'Monday') && flag ? 1: 0;
        flag = (day.dayMonth == 'October') && flag ? 1: 0;

        return flag;
    }
}
