import { Day } from '../calendar/Day'
import { CalUtil } from '../calendar/CalUtil';

export class Valid16
{
	static check(day: Day)
	{
		//check if the day is a weekend
		if(day.dayName.toUpperCase() === "SATURDAY" || day.dayName.toUpperCase() === "SUNDAY")
		{
			return false;
		}
		
		//if friday, check if it is the last friday in the month
		if(day.dayName.toUpperCase() === "FRIDAY")
		{
			if(CalUtil.isLastDay(day) === true) // Last Friday
			{
				return false;
			}
		}

		//if it passes all those checks then the day is valid
		return true;
	}
}
