"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Valid128 {
    static check(day, sortie) {
        if (day.dayNum == 4) // If Thursday
         {
            if (sortie.timeOfDay == true) // If night sortie
             {
                if (sortie.crew == false) // If pilot sortie
                 {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.Valid128 = Valid128;
