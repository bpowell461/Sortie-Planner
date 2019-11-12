import { Week } from './Week';
import { CalUtil } from "./CalUtil";
import { Sortie } from "../sortie/Sortie";

export class Month
{
    /**
    * @param {number} days  Weeks for this month
    */
    weeks: Week[];

    /**
     * Class used to represent a month in a year
     * @param weeks 
     */
    constructor(weeks: Week[])
    {
        this.weeks = weeks;
    }
}