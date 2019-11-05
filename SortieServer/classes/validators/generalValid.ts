import { Day } from '../calendar/day'
import { CalUtil } from '../calendar/calUtil';

export class GeneralValid {
    static check(day: Day) {
        let flag: boolean = true;
        let dayName: string = CalUtil.day2Str(day.dayNum);
        let monthName: string = CalUtil.month2Str(day.monthNum);

        // We might make a general validator class that has functions useful for checking logic
        /* Check logic conditions */
        if(day.dateObj && flag)
            flag = true;
        else
            flag = false;

        if(dayName == 'Monday' && flag)
            flag = true
        else
            flag = false;

        if(monthName == 'October' && flag)
            flag = true;
        else
            flag = false;

        return flag;
    }
}