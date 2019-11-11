import { Day } from '../calendar/day'
import { CalUtil } from '../calendar/calUtil';
import { Sortie } from '../sortie/sortie';

export class Valid128
{
    static check(day: Day, sortie: Sortie)
    {
        if(day.dayNum == 4) // If Thursday
        {
            if(sortie.timeOfDay == true) // If night sortie
            {
                if(sortie.crew == false) // If pilot sortie
                {
                    return true;
                }
            }
        }
        return false;
    }
}