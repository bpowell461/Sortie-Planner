function Valid16(sortieDate)
{
	//check if the day is a weekend
	if(sortieDate.dayName === "Saturday" || sortieDate.dayName === "Sunday")
	{
		return false;
	}
	
	//if friday, check if it is the last friday in the month
	if(sortieDate.dayName === "Friday")
	{
		if(sortieDate.dayCount === 5) //the 5th friday is guaranteed to be the last one
		{
			return false;
		}
		
		else if(sortieDate.dayCount === 4)
		{
			if(sortieDate.dayMonth === "January" || sortieDate.dayMonth === "March" || sortieDate.dayMonth === "May" || sortieDate.dayMonth === "July" || sortieDate.dayMonth === "August" || sortieDate.dayMonth === "October" || sortieDate.dayMonth === "December")
			{
				if(sortieDate.num > 24) //the 4th friday can fall on the 22nd - 28th, but starting at the 25th it is forced to be the last friday
				{
					return false;
				}
			}
			else if(sortieDate.dayMonth === "February")
			{
				if(sortieDate.num > 22) //only fails this check on leap years
				{
					return false;
				}
			}
			else
			{
				if(sortieDate.num > 23)
				{
					return false;
				}
			}
		}
		
		if(sortieDate.timeOfDay === true) //no sorties on friday nights
		{
			return false;
		}
	}

  //if it passes all those checks then the day is valid
  return true;
}
