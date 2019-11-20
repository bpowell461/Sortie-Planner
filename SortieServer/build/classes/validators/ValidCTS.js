"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ValidCTS {
    static check(day, sortie, squad, days, special) {
        if (sortie.crew === false) // ... If it is a crew sortie
         {
            if (sortie.timeOfDay == false) // If it is a day sortie
             {
                if (!special.holiday.includes(days[day.dayNum - 2])) // If yesterday is not a holiday
                 {
                    return true;
                }
            }
        }
        else if (sortie.crew === true) // ... If it is a pilot sortie
         {
            if (sortie.timeOfDay === false && squad.nightCTS > 0) // If 75% of the sorties still need to be scheduled at night
             {
                squad.nightCTS -= 1;
                return true;
            }
            else if (sortie.timeOfDay === true && !(squad.nightCTS > 0)) {
                return true;
            }
        }
        return false;
    }
}
exports.ValidCTS = ValidCTS;
