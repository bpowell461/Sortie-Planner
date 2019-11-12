"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalUtil_1 = require("../calendar/CalUtil");
class ValidGeneral {
    static check(day, sortie, special) {
        if (sortie.timeOfDay === true) // Night sortie
         {
            /* No night sorties on Friday */
            if (day.dayName.toUpperCase() === "FRIDAY") {
                if (CalUtil_1.CalUtil.isDrill(day, special) === false) // If it is not on drill weekend
                 {
                    return false;
                }
            }
            /* No night sorties before a holiday */
            var hol;
            for (hol in special.holiday) {
                if (hol.dayNum - 1 === day.dayNum) {
                    return false;
                }
            }
            /* No night sorties before a train day */
            var tra;
            for (tra in special.training) {
                if (tra.dayNum - 1 === day.dayNum) {
                    return false;
                }
            }
        }
        return true;
    }
}
exports.ValidGeneral = ValidGeneral;
