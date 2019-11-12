import { Day } from '../calendar/Day'
import { CalUtil } from '../calendar/CalUtil';
import { Sortie } from '../sortie/Sortie';
import { SpecialDays } from '../calendar/SpecialDays'

export class ValidGeneral {
    static check(day: Day, sortie: Sortie, special: SpecialDays) {
        if(sortie.timeOfDay === true) // Night sortie
        {
            /* No night sorties on Friday */
            if(day.dayName.toUpperCase() === "FRIDAY")
            {
                if(CalUtil.isDrill(day, special) === false) // If it is not on drill weekend
                {
                    return false;
                }
            }

            /* No night sorties before a holiday */
            var hol: any;
            for(hol in special.holiday)
            {
                if(hol.dayNum-1 === day.dayNum)
                {
                    return false;
                }
            }

            /* No night sorties before a train day */
            var tra: any;
            for(tra in special.training)
            {
                if(tra.dayNum-1 === day.dayNum)
                {
                    return false;
                }
            }
        }

        return true;
    }
}