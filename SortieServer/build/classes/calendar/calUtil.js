"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CalUtil {
    static day2Str(day) {
        var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if (typeof day === "number") {
            day = dayArr[day];
            return day;
        }
        else {
            return day;
        }
    }
    static month2Num(month) {
        var monthArr = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "decemeber"];
        if (typeof month === "string") {
            month = monthArr.indexOf(month.toLowerCase());
            return month;
        }
        else {
            return month;
        }
    }
    static month2Str(month) {
        var monthArr = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "decemeber"];
        if (typeof month === "number") {
            month = monthArr[month];
            return month;
        }
        else {
            return month;
        }
    }
    /* Check if the day is the first of its kind for the month (Ex: first Friday, first Sunday, first Monday) */
    static isFirstDay(day) {
        let dayNum = day.dateObj.getDate(); // Number of day
        let monthNum = (new Date(day.dateObj.getFullYear(), day.dateObj.getMonth(), 0)).getDate(); // Number of days in the month
        if (dayNum - 7 <= 0) // If subtracting seven goes to zero or below, it is the first day of its kind
         {
            return true;
        }
        else {
            return false;
        }
    }
    /* Check if the day is the last of its kind for the month (Ex: last Friday, last Sunday, last Monday) */
    static isLastDay(day) {
        let dayNum = day.dateObj.getDate(); // Number of day
        let monthNum = (new Date(day.dateObj.getFullYear(), day.dateObj.getMonth(), 0)).getDate(); // Number of days in the month
        if (dayNum + 7 > monthNum) // If adding seven does not go over the number of days in the month
         {
            return true;
        }
        else {
            return false;
        }
    }
    /* Check if the day is a weekend */
    static isWeekend(day) {
        if (day.dayName.toUpperCase() == "SATURDAY" || day.dayName.toUpperCase() == "SUNDAY") {
            return true;
        }
        else {
            return false;
        }
    }
    /* Check if day is a drill weekend */
    static isDrill(day, special) {
        if (special.drill.includes(day)) {
            return true;
        }
        else {
            return false;
        }
    }
    /* Check if yesterday has sorties scheduled */
    static isYestSch(day, days) {
        let yestNum = day.dayNum - 1;
        if (days[yestNum - 1].sorties.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    /* Check if tomorrow has sorties scheduled */
    static isTommSch(day, days) {
        let yestNum = day.dayNum + 1;
        if (days[yestNum - 1].sorties.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }
    /* Check if the current day has sorties scheduled */
    static isTodSch(day, days) {
        let todNum = day.dayNum;
        if (days[todNum - 1].sorties.length == 0) {
            return false;
        }
        else {
            return true;
        }
    }
}
exports.CalUtil = CalUtil;
