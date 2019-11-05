"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const calUtil_1 = require("./calUtil");
class Day {
    constructor(dayNum, monthNum, yearNum) {
        /* Note that the '+' before the variable name converts the string to a number */
        this.dayNum = dayNum;
        // Note: Add month as a number from 0-11 NOT 1-12
        this.monthNum = (typeof monthNum === "string" && monthNum.match(/[a-zA-Z]+/)) ? calUtil_1.CalUtil.month2Num(monthNum) : +monthNum;
        this.yearNum = +yearNum;
        this.dateObj = new Date(this.yearNum, this.monthNum, this.dayNum); // Make a new date object to represent this day
        this.scheduled = false; // Day has not be scheduled yet
    }
}
exports.Day = Day;
