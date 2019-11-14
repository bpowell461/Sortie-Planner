import { Day } from '../calendar/Day'
import { CalUtil } from '../calendar/CalUtil';
import { Sortie } from '../sortie/Sortie';
import { SpecialDays } from '../calendar/SpecialDays'

function createMonth(monthName:string, year:number)
{
	let i:number = 0;
	let monthArray:Day[] = [];
	for(i = 0; i < calUtil.getNumberOfDays( month2Num(monthName) + 1, year); i++);
	{
		monthArray.push(new Day(i + 1, monthName, year));
	}
	return monthArray;
}

function createSorties(C12:number, P12:number, C16:number, P16:number, C128:number, P128:number, CTS:number, PTS:number)
{
	let i:number = 0;
	let sortieList:Sortie[] = [];
	
	for(i = 0; i < C12; i++)
	{
		sortieList.push( new Sortie("12th Squadron", false, true) )
	}
	
	for(i = 0; i < P12; i++)
	{
		sortieList.push( new Sortie("12th Squadron", true, false) );
	}
	
	for(i = 0; i < C16; i++)
	{
		sortieList.push( new Sortie("16th Squadron", false, true) );
	}
	
	for(i = 0; i < P16; i++)
	{
		sortieList.push( new Sortie("16th Squadron", true, false) );
	}
	
	for(i = 0; i < C128; i++)
	{
		sortieList.push( new Sortie("128th Squadron", false, true) );
	}
	
	for(i = 0; i < P128; i++)
	{
		sortieList.push( new Sortie("128th Squadron", true, false) );
	}
	
	for(i = 0; i < CTS; i++)
	{
		sortieList.push( new Sortie("Combat Training", false, true) );
	}
	
	for(i = 0; i < PTS; i++)
	{
		sortieList.push( new Sortie("Combat Training", true, false) );
	}
	
	return sortieList;
}

function generateCalendar(monthName:string, year:number, badDays:SpecialDays, C12:number, P12:number, C16:number, P16:number, C128:number, P128:number, CTS:number, PTS:number)
{
	let month:Day[] = createMonth(monthName, year);
	let sortieList:Sortie[] = createSorties(C12, P12, C16, P16, C128, P128, CTS, PTS);
	let i:number = 0;
	let j:number = 0;
	let sum:number = 0;
	let goodPlacement = false;
	
	totalSorties = sortieList.length();
	
	while(totalSorties > 0)
	{
		i = Math.floor(Math.random() * month.length());
		goodPlacement = false;
		if(ValidGeneral.check(month[i], sortieList[sortieList.length() - 1], badDays) === true)
		{
			if(sortieList[sortieList.length() - 1].squadron === "12th Squadron")
			{
				if(Valid12.check(month[i]) === true)
				{
					if(i > 0 && i < month.length() - 1)
					{
						if(month[i - 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1 && month[i + 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1)
						{
							goodPlacement = true;
						}
						else if(i === 0)
						{
							if(month[i + 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1)
							{
								goodPlacement = true;
							}
						}
						else
						{
							if(month[i - 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1)
							{
								goodPlacement = true;
							}
						}
					}
				}
			}
			if(sortieList[sortieList.length() - 1].squadron === "16th Squadron")
			{
				if(Valid16.check(month[i]) === true)
				{
					if(i > 0 && i < month.length() - 1)
					{
						if(month[i - 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1 && month[i + 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1)
						{
							goodPlacement = true;
						}
						else if(i === 0)
						{
							if(month[i + 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1)
							{
								goodPlacement = true;
							}
						}
						else
						{
							if(month[i - 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1)
							{
								goodPlacement = true;
							}
						}
					}
				}
			}
			if(sortieList[sortieList.length() - 1].squadron === "128th Squadron")
			{
				if(Valid128.check(month[i], sortieList[sortieList.length() - 1]) === true)
				{
					if(i > 0 && i < month.length() - 1)
					{
						if(month[i - 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1 && month[i + 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1)
						{
							goodPlacement = true;
						}
						else if(i === 0)
						{
							if(month[i + 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1)
							{
								goodPlacement = true;
							}
						}
						else
						{
							if(month[i - 1].sorties.indexOf(sortieList[sortieList.length() - 1] === -1)
							{
								goodPlacement = true;
							}
						}
					}
				}
			}
			if(sortieList[sortieList.length() - 1].squadron === "Combat Training")
			{
				goodPlacement = true;
			}
		}
		if(month[i].sorties.indexOf(sortieList[sortieList.length() - 1] >= 0)
		{
			goodPlacement = false;
		}
		
		if(goodPlacement === true)
		{
			month[i].sorties.push(sortieList.pop());
		}
		totalSorties = sortieList.length();
	}
	return month;
}