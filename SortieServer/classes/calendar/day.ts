import { CalUtil } from "./calUtil";

export class Day {
    /**
    * Class used to represent days in a sortie calendar 
    * @param {number} dayNum   Number of day in the month.
    * @param {string} monthNum  Number of month.
    * @param {string} yearNum   Number of year.
    * @param {Date} dateObj    Date object for this day
    * @param {boolean} scheduled    Booolean to check if the day has been scheduled or not
    */

    // Note: I am aware this is basically just a Date object as of now, but I intend on adding more information relavant
    // to sortie planning in this class later in the project

    dayNum: string | number; // Number of day in the month (EX: October 29th -> 29)
    monthNum: string | number; // Number of day in the month (EX: October 29th -> Tuesday)
    yearNum: string | number; // Number of month (EX: October 29 -> October)
    dateObj: Date; // Date object for this day
    scheduled: boolean; // Boolean to check if the day has been scheduled or not
    
    constructor(dayNum: number, monthNum: string | number, yearNum: string | number)
    {
        /* Note that the '+' before the variable name converts the string to a number */
        this.dayNum = dayNum;
        // Note: Add month as a number from 0-11 NOT 1-12
        this.monthNum = (typeof monthNum === "string" && monthNum.match(/[a-zA-Z]+/)) ? CalUtil.month2Num(monthNum) : +monthNum;
        this.yearNum = +yearNum;
        this.dateObj = new Date(this.yearNum, this.monthNum, this.dayNum); // Make a new date object to represent this day
        this.scheduled = false; // Day has not be scheduled yet
    }
}