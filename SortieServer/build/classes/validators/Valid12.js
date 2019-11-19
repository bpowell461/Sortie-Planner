"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalUtil_1 = require("../calendar/CalUtil");
class Valid12 {
    static check(day, sortie) {
        //check if the day is a weekend
        if (day.dayName.toUpperCase() === "SATURDAY" || day.dayName.toUpperCase() === "SUNDAY") {
            return false;
        }
        //if friday, check if it is the last friday in the month
        if (day.dayName.toUpperCase() === "FRIDAY") {
            if (CalUtil_1.CalUtil.isFirstDay(day) === true) // First Friday
             {
                return false;
            }
        }
        //if it passes all those checks then the day is valid
        return true;
    }
}
exports.Valid12 = Valid12;
