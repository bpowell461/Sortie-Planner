import { Day } from './Day';
import { CalUtil } from "./CalUtil";
import { Sortie } from "../sortie/Sortie";

export class Week
{
    /**
    * @param {number} days  Days for this week
    */
    days: Day[];

    /**
     * Class used to represent a week of days
     * @param days 
     */
    constructor(days: Day[])
    {
        this.days = days;
    }
}