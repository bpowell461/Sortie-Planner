"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calUtil_1 = require("../calendar/calUtil");
class GeneralValid {
    static check(day) {
        let flag = true;
        let dayName = calUtil_1.CalUtil.day2Str(day.dayNum);
        let monthName = calUtil_1.CalUtil.month2Str(day.monthNum);
        // We might make a general validator class that has functions useful for checking logic
        /* Check logic conditions */
        if (day.dateObj && flag)
            flag = true;
        else
            flag = false;
        if (dayName == 'Monday' && flag)
            flag = true;
        else
            flag = false;
        if (monthName == 'October' && flag)
            flag = true;
        else
            flag = false;
        return flag;
    }
}
exports.GeneralValid = GeneralValid;
