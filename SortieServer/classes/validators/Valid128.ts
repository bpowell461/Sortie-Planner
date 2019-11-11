import { Day } from '../calendar/day'
import { CalUtil } from '../calendar/calUtil';
export class Valid128
{
    static check(sortieDate,night,sortieType)
    {
        //check if the day is a Thursday
        let dayOfWeek= sortieDate.getDay();
        if(dayOfWeek== 4)
        {
            if(night==true)
            {
                return true;
                /*if(sortieType==P)
                {
                    return true;
                }
                */
            }
        }
        return false;
    }
}