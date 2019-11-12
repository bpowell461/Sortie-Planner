import { Day } from './Day';
import { CalUtil } from "./CalUtil";
import { Sortie } from "../sortie/Sortie";

export class SpecialDays 
{
    /**
     * @param {Day[]} holiday Array of days for holidays
     */
    holiday: Day[]; // Holidays

    /**
     * @param {Day[]} training Array of days for training days
     */
    training: Day[]; // Training days

    /**
     * @param {Day[]} drill Array of days for drill weekend
     */
    drill: Day[]; // Drill weekend days

    /**
     * Special days is a class which holds the scheduled days for holidays, training, and drill
     * @param holiday 
     * @param training 
     * @param drill 
     */
    constructor(holiday: Day[], training: Day[], drill: Day[])
    {
        this.holiday = holiday;
        this.training = training;
        this.drill = drill;
    }
}