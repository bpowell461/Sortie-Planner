import { Week } from './Week';
import { CalUtil } from "./CalUtil";
import { Sortie } from "../sortie/Sortie";
import { SpecialDays } from './SpecialDays';

export class Month
{
    /**
    * @param {number} days  Weeks for this month
    */
    weeks: Week[];

    /**
    * @param {SpecialDays} special Special days for this month
    */
    special: SpecialDays;

    /**
     * Class used to represent a month in a year
     * @param weeks 
     * @param special
     */
    constructor(weeks: Week[], special: SpecialDays)
    {
        this.weeks = weeks;
        this.special = special;
    }

    /**
     * Get the number of days in the month
     */
    getDayNum(): number
    {
        let count: number = 0;
        for(var week in this.weeks)
        {
            for(var day in this.weeks[week].days)
            {
                count += 1;
            }
        }

        return count;
    }
}