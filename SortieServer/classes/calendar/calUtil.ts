import { Day } from "./Day";
import { SpecialDays } from "./SpecialDays";

export class CalUtil {
    static day2Str(day: string | number): string
    {
        var dayArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        if(typeof day === "number")
        {
            day = dayArr[day];
            return day;
        }
        else
        {
            return day;
        }
    }

    static month2Num(month: string | number): number
    {
        var monthArr = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "decemeber"];
        if(typeof month === "string")
        {
            month = monthArr.indexOf(month.toLowerCase());
            return month;
        }
        else
        {
            return month;
        }
    }

    static month2Str(month: string | number): string
    {
        var monthArr = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "decemeber"];
        if(typeof month === "number")
        {
            month = monthArr[month];
            return month;
        }
        else
        {
            return month;
        }
    }

    /* Check if the day is the first of its kind for the month (Ex: first Friday, first Sunday, first Monday) */
    static isFirstDay(day: Day): boolean
    {
        let dayNum: number = day.dateObj.getDate(); // Number of day
        let monthNum: number = (new Date(day.dateObj.getFullYear(), day.dateObj.getMonth(), 0)).getDate(); // Number of days in the month

        if(dayNum - 7 <= 0) // If subtracting seven goes to zero or below, it is the first day of its kind
        {
            return true;
        }
        else
        {
            return false;
        }
    }
    /* Check if the day is the last of its kind for the month (Ex: last Friday, last Sunday, last Monday) */
    static isLastDay(day: Day): boolean
    {
        let dayNum: number = day.dateObj.getDate(); // Number of day
        let monthNum: number = (new Date(day.dateObj.getFullYear(), day.dateObj.getMonth(), 0)).getDate(); // Number of days in the month

        if(dayNum + 7 > monthNum) // If adding seven does not go over the number of days in the month
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /* Check if the day is a weekend */
    static isWeekend(day: Day): boolean
    {
        if(day.dayName.toUpperCase() == "SATURDAY" || day.dayName.toUpperCase() == "SUNDAY")
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /* Check if day is a drill weekend */
    static isDrill(day: Day, special: SpecialDays): boolean
    {
        if(special.drill.includes(day))
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    /* Check if yesterday has sorties scheduled */
    static isYestSch(day: Day, days: Day[]): boolean
    {
        let yestNum: number = day.dayNum - 1;
        if(days[yestNum - 1].sorties.length == 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    /* Check if tomorrow has sorties scheduled */
    static isTommSch(day: Day, days: Day[]): boolean
    {
        let yestNum: number = day.dayNum + 1;
        if(days[yestNum - 1].sorties.length == 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    /* Check if the current day has sorties scheduled */
    static isTodSch(day: Day, days: Day[]): boolean
    {
        let todNum: number = day.dayNum;
        if(days[todNum - 1].sorties.length == 0)
        {
            return false;
        }
        else
        {
            return true;
        }
    }
}