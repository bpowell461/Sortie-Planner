"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CalUtil_1 = require("./CalUtil");
class Day {
    /**
     * Day class used to represent a day for planning sorties
     * @param dayNum
     * @param monthNum
     * @param yearNum
     */
    constructor(dayNum, monthNum, yearNum) {
        /* Note that the '+' before the variable name converts the string to a number */
        this.dayNum = dayNum;
        // Note: Add month as a number from 0-11 NOT 1-12
        this.monthNum = (typeof monthNum === "string" && monthNum.match(/[a-zA-Z]+/)) ? CalUtil_1.CalUtil.month2Num(monthNum) : +monthNum;
        this.yearNum = +yearNum;
        this.dateObj = new Date(this.yearNum, this.monthNum, this.dayNum); // Make a new date object to represent this day
        this.dayName = CalUtil_1.CalUtil.day2Str(this.dateObj.getDay()); // Name of the day
        this.holiday = false; // Day is not a holiday until otherwise specified
        this.sorties = []; //Initially, nothing is scheduled on this day
    }
}
exports.Day = Day;
