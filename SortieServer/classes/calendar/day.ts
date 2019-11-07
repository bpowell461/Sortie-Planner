import { CalUtil } from "./calUtil";
import { Sortie } from "../sortie/sortie";

export class Day {
    /**
    * Class used to represent days in a sortie calendar 
    * @param {number} dayNum   Number of day in the month.
    * @param {string} monthNum  Number of month.
    * @param {string} yearNum   Number of year.
    * @param {Date} dateObj   Date object for this day
    * @param {boolean} holiday   Boolean to check if the day is unavailable for scheduling, due to holidays, training days, etc
	* @param {Sortie[]} sorties   Array of sorties that are scheduled for this day
    */

    // Note: I am aware this is basically just a Date object as of now, but I intend on adding more information relavant
    // to sortie planning in this class later in the project

    dayNum: string | number; // Number of day in the month (EX: October 29th -> 29)
    monthNum: string | number; // Number of day in the month (EX: October 29th -> Tuesday)
    yearNum: string | number; // Number of month (EX: October 29 -> October)
    dateObj: Date; // Date object for this day
    holiday: boolean; // Boolean to check if the day has been scheduled or not
	sorties: Sortie[]; // Holds the sorties that get scheduled on this day
    
    constructor(dayNum: number, monthNum: string | number, yearNum: string | number)
    {
        /* Note that the '+' before the variable name converts the string to a number */
        this.dayNum = dayNum;
        // Note: Add month as a number from 0-11 NOT 1-12
        this.monthNum = (typeof monthNum === "string" && monthNum.match(/[a-zA-Z]+/)) ? CalUtil.month2Num(monthNum) : +monthNum;
        this.yearNum = +yearNum;
        this.dateObj = new Date(this.yearNum, this.monthNum, this.dayNum); // Make a new date object to represent this day
        this.holiday = false; // Day is not a holiday until otherwise specified
		this.sorties = []; //Initially, nothing is scheduled on this day
    }
}