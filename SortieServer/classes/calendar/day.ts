import { CalUtil } from "./CalUtil";
import { Sortie } from "../sortie/Sortie";

export class Day 
{
    /**
    * @param {number} dayNum   Number of day in the month. (Sun=0, Mon=1, Tue=2, Wed=3, Thu=4, Fri=5, Sat=6)
    */
    dayNum: number; // Number of day in the month (EX: October 29th -> 29)
    
    /**
     * @param {string} monthNum  Number of month.
     */
    monthNum: string | number; // Number of day in the month (EX: October 29th -> Tuesday)
    
    /**
     * @param {string} yearNum   Number of year.
     */
    yearNum: string | number; // Number of month (EX: October 29 -> October)
    
    /**
     * @param {string} dayName  // Name of day
     */
    dayName: string; // Name of day

    /**
     * @param {Date} dateObj   Date object for this day
     */
    dateObj: Date; // Date object for this day
    
    /**
     * @param {boolean} holiday   Boolean to check if the day is unavailable for scheduling, due to holidays, training days, etc
     */
    holiday: boolean; // Boolean to check if the day has been scheduled or not
    
    /**
     * @param {Sortie[]} sorties   Array of sorties that are scheduled for this day
     */
    sorties: Sortie[]; // Holds the sorties that get scheduled on this day

    /**
     * Day class used to represent a day for planning sorties
     * @param dayNum 
     * @param monthNum 
     * @param yearNum 
     */
    constructor(dayNum: number, monthNum: string | number, yearNum: string | number)
    {
        /* Note that the '+' before the variable name converts the string to a number */
        this.dayNum = dayNum;
        // Note: Add month as a number from 0-11 NOT 1-12
        this.monthNum = (typeof monthNum === "string" && monthNum.match(/[a-zA-Z]+/)) ? CalUtil.month2Num(monthNum) : +monthNum;
        this.yearNum = +yearNum;
        this.dayName = CalUtil.day2Str(this.dayNum);
        this.dateObj = new Date(this.yearNum, this.monthNum, this.dayNum); // Make a new date object to represent this day
        this.holiday = false; // Day is not a holiday until otherwise specified
		this.sorties = []; //Initially, nothing is scheduled on this day
    }
}