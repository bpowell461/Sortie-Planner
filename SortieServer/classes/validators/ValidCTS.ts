import { Day } from '../calendar/Day'
import { CalUtil } from '../calendar/CalUtil';
import { Sortie } from '../sortie/Sortie';
import { Month } from '../calendar/Month';
import { SpecialDays } from '../calendar/SpecialDays';
import { Squad } from '../sortie/Squad';

export class ValidCTS
{
    static check(day: Day, sortie: Sortie, squad: Squad, days: Day[], special: SpecialDays)
    {
        if(sortie.crew === false) // ... If it is a crew sortie
        {
            if(sortie.timeOfDay == false) // If it is a day sortie
            {
                if( ! special.holiday.includes(days[day.dayNum - 2])) // If yesterday is not a holiday
                {
                    return true;
                }
            }
        }
        else if(sortie.crew === true) // ... If it is a pilot sortie
        {
            if(sortie.timeOfDay === false && squad.nightCTS > 0) // If 75% of the sorties still need to be scheduled at night
            {
                squad.nightCTS -= 1;
                return true;
            }
            else if(sortie.timeOfDay === true && !(squad.nightCTS > 0))
            {
                return true;
            }
        }

        return false;
    }
}