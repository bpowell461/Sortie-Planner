import { Day } from '../calendar/Day'
import { CalUtil } from '../calendar/CalUtil';
import { Sortie } from '../sortie/Sortie';

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