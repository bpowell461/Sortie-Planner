import { Sortie } from "../sortie/Sortie";
import { Squad } from "../sortie/Squad";
import { Month } from "../calendar/Month";
import { ValidGeneral } from "../validators/ValidGeneral";
import { Valid12 } from "../validators/Valid12";
import { Valid16 } from "../validators/Valid16";
import { Valid128 } from "../validators/Valid128";
import { ValidCTS } from "../validators/ValidCTS";
import { CalUtil } from "../calendar/CalUtil";

/* Schedule the flight for the squad in the month */
export class Schedule
{
    static scheduleFlights(sqd: Squad, month: Month, ind: number): Sortie[]
    {
        // Returns: The remaining sorties not scheduled
        const sqdName: string = sqd.squadName; 
        let finalRemSortie: Sortie[] = []; // Final list of unused sorties
        const maxDay: number = 5; // This could be user input for each month of the year or in general
        var remSortie: Sortie[] = []; // Remaining sorties for use in lenient scheduling
        switch(sqdName)
        {
            case "Squad12":
                remSortie = [];
                /* Strict scheduling */
                for(var sortie in sqd.sorties) // -- For each sortie
                {
                    let scheduled:boolean = false; // Schedule flag to check rather scheduled or not
                    for(var week in month.weeks) // -- For each week in the month
                    {
                        if(scheduled == false)
                        {
                            for(let day in month.weeks[week].days) // -- For each day in the week
                            {
                                if(scheduled == true)
                                {
                                    break; // Sortie scheduled, exit week loop
                                }

                                /* If today, tomorrow, and yesterday do NOT have sorties, check for validity */
                                if( ! (CalUtil.isTodSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && CalUtil.isYestSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && CalUtil.isTommSch(month.weeks[week].days[day], month.weeks[week].days)))
                                {
                                    /* If the sortie checks out on the general and specific validators, schedule it */
                                    if(ValidGeneral.check(month.weeks[week].days[day], sqd.sorties[sortie], month.special)
                                        && Valid12.check(month.weeks[week].days[day], sqd.sorties[sortie]))
                                    {
                                        month.weeks[week].days[day].sorties.push(sqd.sorties[sortie]);
                                        scheduled = true;
                                    }
                                }
                            }
                        }
                        else
                        {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if(scheduled == false)
                    {
                        remSortie.push(sqd.sorties[sortie]); // Push to remaining sorties
                    }
                }
                
                /* Liberal or lenient scheduling */
                for(var sortie in remSortie) // -- For each remaining sortie
                {
                    let scheduled:boolean = false; // Schedule flag to check rather scheduled or not
                    for(var week in month.weeks) // -- For each week in the month
                    {
                        if(scheduled == false)
                        {
                            for(let day in month.weeks[week].days) // -- For each day in the week
                            {
                                if(scheduled == true)
                                {
                                    break; // Sortie scheduled, exit week loop
                                }

                                /* If the sortie checks out on the general and specific validators, and the day is not overpopulated, schedule it */
                                if(ValidGeneral.check(month.weeks[week].days[day], remSortie[sortie], month.special)
                                    && Valid12.check(month.weeks[week].days[day], remSortie[sortie])
                                    && month.weeks[week].days[day].sorties.length != maxDay) // Day is not overpopulated
                                {
                                    month.weeks[week].days[day].sorties.push(remSortie[sortie]);
                                    scheduled = true;
                                }
                            }
                        }
                        else
                        {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if(scheduled == false)
                    {
                        finalRemSortie.push(remSortie[sortie]); // Push to final remaining sorties list
                    }
                }
                break;
            case "Squad16": // ... Squad 16 scheduling
                remSortie = [];
                /* Strict scheduling */
                for(var sortie in sqd.sorties) // -- For each sortie
                {
                    let scheduled:boolean = false; // Schedule flag to check rather scheduled or not
                    for(var week in month.weeks) // -- For each week in the month
                    {
                        if(scheduled == false)
                        {
                            for(let day in month.weeks[week].days) // -- For each day in the week
                            {
                                if(scheduled == true)
                                {
                                    break; // Sortie scheduled, exit week loop
                                }

                                /* If today, tomorrow, and yesterday do NOT have sorties, check for validity */
                                if( ! (CalUtil.isTodSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && CalUtil.isYestSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && CalUtil.isTommSch(month.weeks[week].days[day], month.weeks[week].days)))
                                {
                                    /* If the sortie checks out on the general and specific validators, schedule it */
                                    if(ValidGeneral.check(month.weeks[week].days[day], sqd.sorties[sortie], month.special)
                                        && Valid16.check(month.weeks[week].days[day], sqd.sorties[sortie]))
                                    {
                                        month.weeks[week].days[day].sorties.push(sqd.sorties[sortie]);
                                        scheduled = true;
                                    }
                                }
                            }
                        }
                        else
                        {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if(scheduled == false)
                    {
                        remSortie.push(sqd.sorties[sortie]); // Push to remaining sorties
                    }
                }
                
                /* Liberal or lenient scheduling */
                for(var sortie in remSortie) // -- For each remaining sortie
                {
                    let scheduled:boolean = false; // Schedule flag to check rather scheduled or not
                    for(var week in month.weeks) // -- For each week in the month
                    {
                        if(scheduled == false)
                        {
                            for(let day in month.weeks[week].days) // -- For each day in the week
                            {
                                if(scheduled == true)
                                {
                                    break; // Sortie scheduled, exit week loop
                                }

                                /* If the sortie checks out on the general and specific validators, and the day is not overpopulated, schedule it */
                                if(ValidGeneral.check(month.weeks[week].days[day], remSortie[sortie], month.special)
                                    && Valid16.check(month.weeks[week].days[day], remSortie[sortie])
                                    && month.weeks[week].days[day].sorties.length != maxDay) // Day is not overpopulated
                                {
                                    month.weeks[week].days[day].sorties.push(remSortie[sortie]);
                                    scheduled = true;
                                }
                            }
                        }
                        else
                        {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if(scheduled == false)
                    {
                        finalRemSortie.push(remSortie[sortie]); // Push to final remaining sorties list
                    }
                }
                break;
            case "Squad128":
                /* Strict scheduling */
                remSortie = []; // Remaining sorties for use in lenient scheduling
                for(var sortie in sqd.sorties) // -- For each sortie
                {
                    let scheduled:boolean = false; // Schedule flag to check rather scheduled or not
                    for(var week in month.weeks) // -- For each week in the month
                    {
                        if(scheduled == false)
                        {
                            for(let day in month.weeks[week].days) // -- For each day in the week
                            {
                                if(scheduled == true)
                                {
                                    break; // Sortie scheduled, exit week loop
                                }

                                /* If today, tomorrow, and yesterday do NOT have sorties, check for validity */
                                if( ! (CalUtil.isTodSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && CalUtil.isYestSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && CalUtil.isTommSch(month.weeks[week].days[day], month.weeks[week].days)))
                                {
                                    /* If the sortie checks out on the general and specific validators, schedule it */
                                    if(ValidGeneral.check(month.weeks[week].days[day], sqd.sorties[sortie], month.special)
                                        && Valid128.check(month.weeks[week].days[day], sqd.sorties[sortie]))
                                    {
                                        month.weeks[week].days[day].sorties.push(sqd.sorties[sortie]);
                                        scheduled = true;
                                    }
                                }
                            }
                        }
                        else
                        {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if(scheduled == false)
                    {
                        remSortie.push(sqd.sorties[sortie]); // Push to remaining sorties
                    }
                }
                
                /* Liberal or lenient scheduling */
                for(var sortie in remSortie) // -- For each remaining sortie
                {
                    let scheduled:boolean = false; // Schedule flag to check rather scheduled or not
                    for(var week in month.weeks) // -- For each week in the month
                    {
                        if(scheduled == false)
                        {
                            for(let day in month.weeks[week].days) // -- For each day in the week
                            {
                                if(scheduled == true)
                                {
                                    break; // Sortie scheduled, exit week loop
                                }

                                /* If the sortie checks out on the general and specific validators, and the day is not overpopulated, schedule it */
                                if(ValidGeneral.check(month.weeks[week].days[day], remSortie[sortie], month.special)
                                    && Valid128.check(month.weeks[week].days[day], remSortie[sortie])
                                    && month.weeks[week].days[day].sorties.length != maxDay) // Day is not overpopulated
                                {
                                    month.weeks[week].days[day].sorties.push(remSortie[sortie]);
                                    scheduled = true;
                                }
                            }
                        }
                        else
                        {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if(scheduled == false)
                    {
                        finalRemSortie.push(remSortie[sortie]); // Push to final remaining sorties list
                    }
                }
                break;
            case "SquadCTS":
                /* Strict scheduling */
                remSortie = []; // Remaining sorties for use in lenient scheduling
                for(var sortie in sqd.sorties) // -- For each sortie
                {
                    let scheduled:boolean = false; // Schedule flag to check rather scheduled or not
                    for(var week in month.weeks) // -- For each week in the month
                    {
                        if(scheduled == false)
                        {
                            for(let day in month.weeks[week].days) // -- For each day in the week
                            {
                                if(scheduled == true)
                                {
                                    break; // Sortie scheduled, exit week loop
                                }

                                /* If today, tomorrow, and yesterday do NOT have sorties, check for validity */
                                if( ! (CalUtil.isTodSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && CalUtil.isYestSch(month.weeks[week].days[day], month.weeks[week].days)
                                    && CalUtil.isTommSch(month.weeks[week].days[day], month.weeks[week].days)))
                                {
                                    /* If the sortie checks out on the general and specific validators, schedule it */
                                    if(ValidGeneral.check(month.weeks[week].days[day], sqd.sorties[sortie], month.special)
                                        && ValidCTS.check(month.weeks[week].days[day], sqd.sorties[sortie], sqd, month.weeks[week].days, month.special))
                                    {
                                        month.weeks[week].days[day].sorties.push(sqd.sorties[sortie]);
                                        scheduled = true;
                                    }
                                }
                            }
                        }
                        else
                        {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if(scheduled == false)
                    {
                        remSortie.push(sqd.sorties[sortie]); // Push to remaining sorties
                    }
                }
                
                /* Liberal or lenient scheduling */
                for(var sortie in remSortie) // -- For each remaining sortie
                {
                    let scheduled:boolean = false; // Schedule flag to check rather scheduled or not
                    for(var week in month.weeks) // -- For each week in the month
                    {
                        if(scheduled == false)
                        {
                            for(let day in month.weeks[week].days) // -- For each day in the week
                            {
                                if(scheduled == true)
                                {
                                    break; // Sortie scheduled, exit week loop
                                }

                                /* If the sortie checks out on the general and specific validators, and the day is not overpopulated, schedule it */
                                if(ValidGeneral.check(month.weeks[week].days[day], remSortie[sortie], month.special)
                                    && ValidCTS.check(month.weeks[week].days[day], sqd.sorties[sortie], sqd, month.weeks[week].days, month.special)
                                    && month.weeks[week].days[day].sorties.length != maxDay) // Day is not overpopulated
                                {
                                    month.weeks[week].days[day].sorties.push(remSortie[sortie]);
                                    scheduled = true;
                                }
                            }
                        }
                        else
                        {
                            break; // Sortie scheduled, so break out of the weeks loop
                        }
                    }
                    if(scheduled == false)
                    {
                        finalRemSortie.push(remSortie[sortie]); // Push to final remaining sorties list
                    }
                }
                break;
            default:
                /* Add default logic for scheduling */
                break;
        };
        return finalRemSortie; // Returns the sorties that went unscheduled	
    }
}