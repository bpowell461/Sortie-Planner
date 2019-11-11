import { Day } from '../calendar/day'
import { CalUtil } from '../calendar/calUtil';
import { Sortie } from '../sortie/sortie';

export class Valid16
{
	static check(day: Day, sortie: Sortie)
	{
		//check if the day is a weekend
		if(day.dayName === "Saturday" || day.dayName === "Sunday")
		{
			return false;
		}
		
		//if friday, check if it is the last friday in the month
		if(day.dayName === "Friday")
		{
			if(day.dayCount === 5) //the 5th friday is guaranteed to be the last one
			{
				return false;
			}
			
			else if(day.dayCount === 4)
			{
				if(day.dayMonth === "January" || day.dayMonth === "March" || day.dayMonth === "May" || day.dayMonth === "July" || day.dayMonth === "August" || day.dayMonth === "October" || day.dayMonth === "December")
				{
					if(day.num > 24) //the 4th friday can fall on the 22nd - 28th, but starting at the 25th it is forced to be the last friday
					{
						return false;
					}
				}
				else if(day.dayMonth === "February")
				{
					if(day.num > 22) //only fails this check on leap years
					{
						return false;
					}
				}
				else
				{
					if(day.num > 23)
					{
						return false;
					}
				}
			}
			
			if(day.timeOfDay === true) //no sorties on friday nights
			{
				return false;
			}
		}

		//if it passes all those checks then the day is valid
		return true;
	}
}
