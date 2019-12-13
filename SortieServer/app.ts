import { Day } from "./classes/calendar/Day";
import { Sortie } from "./classes/sortie/Sortie";
import { Month } from "./classes/calendar/Month";
import { Week } from "./classes/calendar/Week";
import { SpecialDays } from "./classes/calendar/SpecialDays";
import { Squad } from "./classes/sortie/Squad";
import { Partition } from "./classes/logic/Partition";
import { Schedule } from "./classes/logic/Schedule";
import { CalUtil } from "./classes/calendar/CalUtil";

// Check out https://www.robinwieruch.de/node-express-server-rest-api

var express = require('express');
var router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
	return res.send("Hello World!!!");
});

/*
app.get('/calendar', (req, res) => {
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];

	let date: Date = new Date();
	var currMonth = date.getMonth();
	var currYear = date.getFullYear()+1900; // Must add 1900 for some ridiculous reason

	var monthDate = new Date(2019, currMonth+1, 0); 
	var numDays = monthDate.getDate();

	var calDays: any[] = [];
	for(var i=0; i<numDays; i++)
	{
	  var dayDate = new Date(2019, currMonth, i+1);
	  var day = dayDate.getDay();
	  calDays[i] = {dayNum: i+1, dayName: days[day]};
	}
	return res.send(Object.values(calDays));
});
*/

/* Route to get the current year for the client-side calendar */
app.get('/cal', (req, res) => {
	let yearNum: number = 2019; // Current year
	let monthArr: Month[] = []; //[new Month([], new SpecialDays([], [], [])), ]; // Array of months for this current year

	/* For each month in the  year */
	for(let month = 0; month < 12; month++)
	{
		monthArr[month] = new Month([], new SpecialDays([], [], [])); // Initiate a new month
		let weekCount= 0; // Counter for weeks of this month
		var dayCount:number = 0; // Counter for the number of days in the week
		var dayNum:number = (new Date(yearNum, month+1, 0)).getDate(); // Number of days in the month

		monthArr[month].weeks[weekCount] = new Week([]); // Initialize new week
		monthArr[month].weeks[weekCount].days = []; // Initialize array of days for this week

		/* For each day in THIS month */
		for(let day = 1; day <= dayNum; day++)
		{
			monthArr[month].weeks[weekCount].days[dayCount] = new Day(day, month, yearNum); // Add a day to this week of the month
			if(monthArr[month].weeks[weekCount].days[dayCount].dayName.toUpperCase() === "SATURDAY") // If it is the "last" day of this week
			{
				if(weekCount == 0) // If it is the first week
				{
					var week_len = monthArr[month].weeks[weekCount].days.length;
					for(let i=1; i <= 7-week_len; ++i) // If the number of the days in the week is less than 7
					{
						monthArr[month].weeks[weekCount].days.unshift(new Day(-1, month, yearNum)); // Prepend some placeholder blocks
					}
				}
				if(day != dayNum) // If this is not the last day
				{
					weekCount += 1; // Update week count
				}
				dayCount = 0; // Reset day count
				monthArr[month].weeks[weekCount] = new Week([]); // Initialize new week
				monthArr[month].weeks[weekCount].days = []; // Initialize array of days for this week
			}
			else
			{
				dayCount += 1; // Update day count
			}
		} // Track with some variables
		var week_len = monthArr[month].weeks[weekCount].days.length;
		for(let i=1; i <= 7-week_len; ++i) // If the number of days in the last week is less than 7
		{
			monthArr[month].weeks[weekCount].days.push(new Day(-1, month, yearNum)); // Push some placeholder days
		}

	}

	return res.send(JSON.stringify(monthArr)); 
});

/* Route to test our validator functionality */
app.get('/test', (req, res) => {
	let yearNum: number = 2019; // Current year
	let monthArr: Month[] = []; //[new Month([], new SpecialDays([], [], [])), ]; // Array of months for this current year

	/* For each month in the  year */
	for(let month = 0; month < 12; month++)
	{
		monthArr[month] = new Month([], new SpecialDays([], [], [])); // Initiate a new month
		let weekCount:number = 0; // Counter for weeks of this month
		let dayCount:number = 0; // Counter for the number of days in the week
		let dayNum:number = (new Date(yearNum, month+1, 0)).getDate(); // Number of days in the month

		monthArr[month].weeks[weekCount] = new Week([]); // Initialize new week
		monthArr[month].weeks[weekCount].days = []; // Initialize array of days for this week

		/* For each day in THIS month */
		for(let day = 1; day <= dayNum; day++)
		{
			monthArr[month].weeks[weekCount].days[dayCount] = new Day(day, month, yearNum); // Add a day to this week of the month
			if(monthArr[month].weeks[weekCount].days[dayCount].dayName.toUpperCase() === "SATURDAY") // If it is the "last" day of this week
			{
				weekCount += 1; // Update week count
				dayCount = 0; // Reset day count
				monthArr[month].weeks[weekCount] = new Week([]); // Initialize new week
				monthArr[month].weeks[weekCount].days = []; // Initialize array of days for this week
			}
			else
			{
				dayCount += 1; // Update day count
			}
		}
	}

	/* Add dummy data for drill, holidays, and training */
	
	// Note that you can adjust these two arrays however you want to test your scheduling algorithm
	var holidays = [new Date(2019, 1, 2), new Date(2019, 5, 5), new Date(2019, 7, 15)]; // These aren't real holiday, just for testing purposes
	var training = [new Date(2019, 5, 4), new Date(2019, 4, 4), new Date(2019, 2, 10)]; // Again, these are just for testing purposes
	for(var month in monthArr)
	{
		monthArr[month].special.drill = monthArr[month].weeks[1].days; // Set the second week of each month to a dirll week
		for(var week in monthArr[month].weeks)
		{
			for(var day in monthArr[month].weeks[week].days)
			{
				var dayObj = monthArr[month].weeks[week].days[day]; // Get the day
				var dateObj = dayObj.dateObj; // Get the date object of the day
				/* If the date is a holiday */
				if(holidays.includes(dateObj))
				{
					monthArr[month].special.holiday.push(dayObj); // Append it to the holidays array for special
				}

				/* If the date is a training day */
				if(training.includes(dateObj))
				{
					monthArr[month].special.holiday.push(dayObj); // Append it to the training array for special
				}
			}
		}
	}

	/* Generate the sorties */
	// Array of squads for each month
	// Test sorties (Could get this from a database)
	let squad12: Squad[] = [];
	let squad16: Squad[] = [];
	let squad128: Squad[] = [];
	let squadCTS: Squad[] = []; // Training squadron

	// Adjust these arrays of flight and numbers how you want for testing your scheduling algorithm
	let flightAmount:number[] = [10, 64, 31, 43, 74, 32, 33, 34, 53, 57, 33, 62]; // Fake number of flights

	//for(let month=0; month < 12; month++)
	for(var month in monthArr)
	{
		// -- Sortie generation
		squad12.push(new Squad("Squad12", [new Sortie("Squad12", false, false), new Sortie("Squad12", true, false), new Sortie("Squad12", false, true), new Sortie("Squad12", true, true)]));
		squad16.push(new Squad("Squad16", [new Sortie("Squad16", false, false), new Sortie("Squad16", true, false), new Sortie("Squad16", false, true), new Sortie("Squad16", true, true)]));
		squad128.push(new Squad("Squad128", [new Sortie("Squad128", false, false), new Sortie("Squad128", true, false), new Sortie("Squad128", false, true), new Sortie("Squad128", true, true)]));
		squadCTS.push(new Squad("SquadCTS", [new Sortie("SquadCTS", false, false), new Sortie("SquadCTS", true, false), new Sortie("SquadCTS", false, true), new Sortie("SquadCTS", true, true)]));

		// -- Logic for 75% of CTS pilot sorties at night
		let CTSNightCount: number = 0;
		for(var sortie in squadCTS[month].sorties)
		{
			if(squadCTS[month].sorties[sortie].crew === false) // Pilot sortie
			{
				CTSNightCount += 1;
			}
		}
		//squadCTS[month].flightNum = Math.floor(CTSNightCount * .75); // 75% of the sorties
	
		// -- Get the numbers for calculations
		let flightNum: number = flightAmount[month]; // Get the number of flights for this month
		let sortieNum: number = squad12[month].sorties.length + squad16[month].sorties.length + squad128[month].sorties.length + squadCTS[month].sorties.length; // Get the number of sorties
		
		// -- Calculate the number of flights allocated to each squadron
		let flightSqdAmt: number =  0; // Number of flights to be allocated per squad
		let flightSqdRem: number = 0; // Remaining flights to be allocated for each squad
		let flightCount: number = flightNum; // Keeps track of number of flights left to partition
		let sortieCount: number = sortieNum; // Keeps track of number of sorties left to be planned
		let squadAmt: number = 4; // Number of squadrons to schedule
		let speedMode: boolean = false; //shortcuts the generation algorithm

		do // While there are flights left
		{
			// If there are more flights than there are sorties, no calculations need to be done
			if(flightCount >= sortieCount)
			{
				speedMode = true;
				flightSqdRem = 0;
			}
			else if(flightCount < sortieCount) //otherwise, each squadron will only get a portion
			{

				if(flightCount >= squadAmt)
				{
					flightSqdAmt = Math.floor(flightCount / squadAmt); //number of flights that each squadron can get
					flightSqdRem = flightCount % squadAmt; //calculate leftovers
				}
				else if(flightCount < squadAmt) //big problems, not enough flights to even give 1 per squadron
				{
					flightSqdAmt = 0;
					flightSqdRem = flightCount; // No more flights to schedule
					
					flightSqdRem = Partition.partitionFlights(squad12[month], flightSqdRem, false)
					if(flightSqdRem > 0)
					{
						flightSqdRem = flightSqdRem - Partition.partitionFlights(squad16[month], flightSqdRem, false)
						if(flightSqdRem > 0)
						{
							flightSqdRem = flightSqdRem - Partition.partitionFlights(squad128[month], flightSqdRem, false)
							if(flightSqdRem > 0)
							{
								flightSqdRem = flightSqdRem - Partition.partitionFlights(squad12[month], flightSqdRem, false) //give the flights to whatever can take them
								if(flightSqdRem > 0)
								{
									console.log("BAD"); //should never happen
								}
							}
						}
					}		
				}
			}
			flightSqdRem += Partition.partitionFlights(squad12[month], flightSqdAmt, speedMode);
			flightSqdRem += Partition.partitionFlights(squad16[month], flightSqdAmt, speedMode);
			flightSqdRem += Partition.partitionFlights(squad128[month], flightSqdAmt, speedMode);
			flightSqdRem += Partition.partitionFlights(squadCTS[month], flightSqdAmt, speedMode);
			
			flightCount = flightSqdRem; // The total number of flights left is the remainder
			//sortieCount = squad12[month].sortieRem + squad16[month].sortieRem + squad128[month].sortieRem + squadCTS[month].sortieRem; // Get remaining sorties
		} while(flightCount > 0) // loop never terminates via sortie count
		speedMode = false;
	}
	
	// -- Remove the sorties that will not be flown
	let sortieRem : Sortie[] = []; // List of remaining sorties not flown
	
	for(let month=0; month < 12; month++)
	{
		if((squad12[month].sorties != undefined) && (squad12[month].sorties.length != 0)) // If there are sorties
		{
			for(let sortRem=0; sortRem < squad12[month].sortieRem; sortRem++)
			{
				let sortie: Sortie | undefined = squad12[month].sorties.pop(); // Take one off the end
				if(sortie !== undefined)
				{
					sortieRem.push(sortie);
				}
			}
		}
	}

	for(let month=0; month < 12; month++)
	{
		if((squad16[month].sorties != undefined) && (squad16[month].sorties.length != 0)) // If there are sorties
		{
			for(let sortRem=0; sortRem < squad16[month].sortieRem; sortRem++)
			{
				let sortie: Sortie | undefined = squad16[month].sorties.pop(); // Take one off the end
				if(sortie !== undefined)
				{
					sortieRem.push(sortie);
				}
			}
		}
	}

	for(let month=0; month < 12; month++)
	{
		if((squad128[month].sorties != undefined) && (squad128[month].sorties.length != 0)) // If there are sorties
		{
			for(let sortRem=0; sortRem < squad128[month].sortieRem; sortRem++)
			{
				let sortie: Sortie | undefined = squad128[month].sorties.pop(); // Take one off the end
				if(sortie !== undefined)
				{
					sortieRem.push(sortie);
				}
			}
		}
	}

	for(let month=0; month < 12; month++)
	{
		if((squadCTS[month].sorties != undefined) && (squadCTS[month].sorties.length != 0)) // If there are sorties
		{
			for(let sortRem=0; sortRem < squadCTS[month].sortieRem; sortRem++)
			{
				let sortie: Sortie | undefined = squadCTS[month].sorties.pop(); // Take one off the end
				if(sortie !== undefined)
				{
					sortieRem.push(sortie);
				}
			}
		}
	}
	
	// -- Schedule the sorties for the year
	for(let month=0; month < 12; month++)
	{
		/* The order of precedence for scheduling is from first to last*/
		// NOTE: We concatenate the remaining sorties returned from the scheduling here. Could be useful later.
		sortieRem.concat(Schedule.scheduleFlights(squad12[month], monthArr[month], month));
		sortieRem.concat(Schedule.scheduleFlights(squad16[month], monthArr[month], month));
		sortieRem.concat(Schedule.scheduleFlights(squad128[month], monthArr[month], month));
		sortieRem.concat(Schedule.scheduleFlights(squadCTS[month], monthArr[month], month));
	}
	
	/* Test the scheduling algorithm */
	var output = "";
	var sOutputM = ""; // Save output for month
	var sOutputD = ""; // Save output for day
	var count = 0; // Month count
	var sortieObjList= Array();

	for(let month of monthArr)
	{
		output = "";
		output = output + "Month: " + CalUtil.month2Str(count) + " ";
		sOutputM = output; // Save month info
		for(let week of month.weeks)
		{
			for(let day of week.days)
			{
				output = sOutputM;
				output = output + day.dayName + ":" + day.dayNum.toString() + " ";
				sOutputD = output; // Save day info
				for(let sortie of day.sorties)
				{
					output = sOutputD;
					output = output + sortie.squadron; // Name of the squadron
					
					var sortieObj = {month:count, day: day.dayNum, dayName: day.dayName, squad: sortie.squadron}; // Define JSON object here (NOTE: We add more data later)
					sortieObjList.push(sortieObj);	
				}
			}
		}
		count += 1;
	}

	return res.send(JSON.stringify(sortieObjList));
	//return res.send(JSON.stringify(1)); // Send the result (True (1) or False (0)) in the response to the user
});
module.exports = router;
app.listen(8000);
