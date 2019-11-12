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
}