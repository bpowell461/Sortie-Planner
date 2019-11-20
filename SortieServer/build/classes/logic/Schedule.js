"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ValidGeneral_1 = require("../validators/ValidGeneral");
const Valid12_1 = require("../validators/Valid12");
const Valid16_1 = require("../validators/Valid16");
const Valid128_1 = require("../validators/Valid128");
const ValidCTS_1 = require("../validators/ValidCTS");
const CalUtil_1 = require("../calendar/CalUtil");
/* Schedule the flight for the squad in the month */
class Schedule {
    static scheduleFlights(sqd, month, ind) {
        // Returns: The remaining sorties not scheduled
        const sqdName = sqd.squadName;
        let finalRemSortie = []; // Final list of unused sorties
        const maxDay = 5; // This could be user input for each month of the year or in general
        var remSortie = []; // Remaining sorties for use in lenient scheduling
        switch (sqdName) {
            case "Squad12":
                remSortie = [];
                /* Strict scheduling */
                for (let sortie in sqd.sorties) // -- For each sortie
                 {
                    let scheduled = false; // Schedule flag to check rather scheduled or not
                    for (let week in month.weeks) // -- For each week in the month
                     {
                        if (scheduled == false) {
                            for (let day in month.weeks[week].days) // -- For each day in the week
                             {
                                if (scheduled == true) {
                                    break; // Sortie scheduled, exit week loop
                                }
                                /* If today, tomorrow, and yesterday do NOT have sorties, check for validity */
                                if ((!CalUtil_1.CalUtil.isTodSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && !CalUtil_1.CalUtil.isYestSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && !CalUtil_1.CalUtil.isTommSch(month.weeks[week].days[day], month.weeks[week].days))) {
                                    /* If the sortie checks out on the general and specific validators, schedule it */
                                    if (ValidGeneral_1.ValidGeneral.check(month.weeks[week].days[day], sqd.sorties[sortie], month.special)
                                        && Valid12_1.Valid12.check(month.weeks[week].days[day], sqd.sorties[sortie])) {
                                        month.weeks[week].days[day].sorties.push(sqd.sorties[sortie]);
                                        scheduled = true;
                                    }
                                }
                            }
                        }
                        else {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if (scheduled == false) {
                        remSortie.push(sqd.sorties[sortie]); // Push to remaining sorties
                    }
                }
                /* Liberal or lenient scheduling */
                for (var sortie in remSortie) // -- For each remaining sortie
                 {
                    let scheduled = false; // Schedule flag to check rather scheduled or not
                    for (var week in month.weeks) // -- For each week in the month
                     {
                        if (scheduled == false) {
                            for (let day in month.weeks[week].days) // -- For each day in the week
                             {
                                if (scheduled == true) {
                                    break; // Sortie scheduled, exit week loop
                                }
                                /* If the sortie checks out on the general and specific validators, and the day is not overpopulated, schedule it */
                                if (ValidGeneral_1.ValidGeneral.check(month.weeks[week].days[day], remSortie[sortie], month.special)
                                    && Valid12_1.Valid12.check(month.weeks[week].days[day], remSortie[sortie])
                                    && month.weeks[week].days[day].sorties.length != maxDay) // Day is not overpopulated
                                 {
                                    month.weeks[week].days[day].sorties.push(remSortie[sortie]);
                                    scheduled = true;
                                }
                            }
                        }
                        else {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if (scheduled == false) {
                        finalRemSortie.push(remSortie[sortie]); // Push to final remaining sorties list
                    }
                }
                break;
            case "Squad16": // ... Squad 16 scheduling
                remSortie = [];
                /* Strict scheduling */
                for (var sortie in sqd.sorties) // -- For each sortie
                 {
                    let scheduled = false; // Schedule flag to check rather scheduled or not
                    for (var week in month.weeks) // -- For each week in the month
                     {
                        if (scheduled == false) {
                            for (let day in month.weeks[week].days) // -- For each day in the week
                             {
                                if (scheduled == true) {
                                    break; // Sortie scheduled, exit week loop
                                }
                                /* If today, tomorrow, and yesterday do NOT have sorties, check for validity */
                                if ((!CalUtil_1.CalUtil.isTodSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && !CalUtil_1.CalUtil.isYestSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && !CalUtil_1.CalUtil.isTommSch(month.weeks[week].days[day], month.weeks[week].days))) {
                                    /* If the sortie checks out on the general and specific validators, schedule it */
                                    if (ValidGeneral_1.ValidGeneral.check(month.weeks[week].days[day], sqd.sorties[sortie], month.special)
                                        && Valid16_1.Valid16.check(month.weeks[week].days[day], sqd.sorties[sortie])) {
                                        month.weeks[week].days[day].sorties.push(sqd.sorties[sortie]);
                                        scheduled = true;
                                    }
                                }
                            }
                        }
                        else {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if (scheduled == false) {
                        remSortie.push(sqd.sorties[sortie]); // Push to remaining sorties
                    }
                }
                /* Liberal or lenient scheduling */
                for (var sortie in remSortie) // -- For each remaining sortie
                 {
                    let scheduled = false; // Schedule flag to check rather scheduled or not
                    for (var week in month.weeks) // -- For each week in the month
                     {
                        if (scheduled == false) {
                            for (let day in month.weeks[week].days) // -- For each day in the week
                             {
                                if (scheduled == true) {
                                    break; // Sortie scheduled, exit week loop
                                }
                                /* If the sortie checks out on the general and specific validators, and the day is not overpopulated, schedule it */
                                if (ValidGeneral_1.ValidGeneral.check(month.weeks[week].days[day], remSortie[sortie], month.special)
                                    && Valid16_1.Valid16.check(month.weeks[week].days[day], remSortie[sortie])
                                    && month.weeks[week].days[day].sorties.length != maxDay) // Day is not overpopulated
                                 {
                                    month.weeks[week].days[day].sorties.push(remSortie[sortie]);
                                    scheduled = true;
                                }
                            }
                        }
                        else {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if (scheduled == false) {
                        finalRemSortie.push(remSortie[sortie]); // Push to final remaining sorties list
                    }
                }
                break;
            case "Squad128":
                /* Strict scheduling */
                remSortie = []; // Remaining sorties for use in lenient scheduling
                for (var sortie in sqd.sorties) // -- For each sortie
                 {
                    let scheduled = false; // Schedule flag to check rather scheduled or not
                    for (var week in month.weeks) // -- For each week in the month
                     {
                        if (scheduled == false) {
                            for (let day in month.weeks[week].days) // -- For each day in the week
                             {
                                if (scheduled == true) {
                                    break; // Sortie scheduled, exit week loop
                                }
                                /* If today, tomorrow, and yesterday do NOT have sorties, check for validity */
                                if ((!CalUtil_1.CalUtil.isTodSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && !CalUtil_1.CalUtil.isYestSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && !CalUtil_1.CalUtil.isTommSch(month.weeks[week].days[day], month.weeks[week].days))) {
                                    /* If the sortie checks out on the general and specific validators, schedule it */
                                    if (ValidGeneral_1.ValidGeneral.check(month.weeks[week].days[day], sqd.sorties[sortie], month.special)
                                        && Valid128_1.Valid128.check(month.weeks[week].days[day], sqd.sorties[sortie])) {
                                        month.weeks[week].days[day].sorties.push(sqd.sorties[sortie]);
                                        scheduled = true;
                                    }
                                }
                            }
                        }
                        else {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if (scheduled == false) {
                        remSortie.push(sqd.sorties[sortie]); // Push to remaining sorties
                    }
                }
                /* Liberal or lenient scheduling */
                for (var sortie in remSortie) // -- For each remaining sortie
                 {
                    let scheduled = false; // Schedule flag to check rather scheduled or not
                    for (var week in month.weeks) // -- For each week in the month
                     {
                        if (scheduled == false) {
                            for (let day in month.weeks[week].days) // -- For each day in the week
                             {
                                if (scheduled == true) {
                                    break; // Sortie scheduled, exit week loop
                                }
                                /* If the sortie checks out on the general and specific validators, and the day is not overpopulated, schedule it */
                                if (ValidGeneral_1.ValidGeneral.check(month.weeks[week].days[day], remSortie[sortie], month.special)
                                    && Valid128_1.Valid128.check(month.weeks[week].days[day], remSortie[sortie])
                                    && month.weeks[week].days[day].sorties.length != maxDay) // Day is not overpopulated
                                 {
                                    month.weeks[week].days[day].sorties.push(remSortie[sortie]);
                                    scheduled = true;
                                }
                            }
                        }
                        else {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if (scheduled == false) {
                        finalRemSortie.push(remSortie[sortie]); // Push to final remaining sorties list
                    }
                }
                break;
            case "SquadCTS":
                /* Strict scheduling */
                remSortie = []; // Remaining sorties for use in lenient scheduling
                for (var sortie in sqd.sorties) // -- For each sortie
                 {
                    let scheduled = false; // Schedule flag to check rather scheduled or not
                    for (var week in month.weeks) // -- For each week in the month
                     {
                        if (scheduled == false) {
                            for (let day in month.weeks[week].days) // -- For each day in the week
                             {
                                if (scheduled == true) {
                                    break; // Sortie scheduled, exit week loop
                                }
                                /* If today, tomorrow, and yesterday do NOT have sorties, check for validity */
                                if (!CalUtil_1.CalUtil.isTodSch(month.weeks[week].days[day], month.weeks[week].days)) 
                                //&& CalUtil.isYestSch(month.weeks[week].days[day], month.weeks[week].days)
                                //&& CalUtil.isTommSch(month.weeks[week].days[day], month.weeks[week].days)))
                                {
                                    /* If the sortie checks out on the general and specific validators, schedule it */
                                    if (ValidGeneral_1.ValidGeneral.check(month.weeks[week].days[day], sqd.sorties[sortie], month.special)
                                        && ValidCTS_1.ValidCTS.check(month.weeks[week].days[day], sqd.sorties[sortie], sqd, month.weeks[week].days, month.special)) {
                                        month.weeks[week].days[day].sorties.push(sqd.sorties[sortie]);
                                        scheduled = true;
                                    }
                                }
                            }
                        }
                        else {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if (scheduled == false) {
                        remSortie.push(sqd.sorties[sortie]); // Push to remaining sorties
                    }
                }
                /* Liberal or lenient scheduling */
                for (var sortie in remSortie) // -- For each remaining sortie
                 {
                    let scheduled = false; // Schedule flag to check rather scheduled or not
                    for (var week in month.weeks) // -- For each week in the month
                     {
                        if (scheduled == false) {
                            for (let day in month.weeks[week].days) // -- For each day in the week
                             {
                                if (scheduled == true) {
                                    break; // Sortie scheduled, exit week loop
                                }
                                /* If the sortie checks out on the general and specific validators, and the day is not overpopulated, schedule it */
                                if (ValidGeneral_1.ValidGeneral.check(month.weeks[week].days[day], remSortie[sortie], month.special)
                                    && ValidCTS_1.ValidCTS.check(month.weeks[week].days[day], sqd.sorties[sortie], sqd, month.weeks[week].days, month.special)
                                    && month.weeks[week].days[day].sorties.length != maxDay) // Day is not overpopulated
                                 {
                                    month.weeks[week].days[day].sorties.push(remSortie[sortie]);
                                    scheduled = true;
                                }
                            }
                        }
                        else {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if (scheduled == false) {
                        finalRemSortie.push(remSortie[sortie]); // Push to final remaining sorties list
                    }
                }
                break;
            default:
                /* Add default logic for scheduling */
                break;
        }
        ;
        return finalRemSortie; // Returns the sorties that went unscheduled	
    }
}
exports.Schedule = Schedule;
