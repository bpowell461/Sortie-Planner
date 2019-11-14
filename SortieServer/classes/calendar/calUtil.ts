import { Day } from "./Day";
import { SpecialDays } from "./SpecialDays";

export class CalUtil {
    getNumberOfDays(month, year)
    {
        if(month == 2)
        {
            if((year%400 == 0) ||(year%4 == 0 && year%100 != 0))
            {
                return 29;
            }
            else
            {
                return 28;
            }
        }
        else if(month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12)
            return 31;
        else
            return 30;
    }

    dayOfWeek(d, m, y)
    {
        var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
        //y -= m < 3; // -- Need to fix this
        return ((y+y/4 - y/100+y/400+t[m-1]+d)%7);
    }

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
	
	static isFirstDay(day: Day): boolean
    {
        let dayNum: number = day.dateObj.getDate(); // Number of day
        if(dayNum < 7) // If adding seven does not go over the number of days in the month
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
}