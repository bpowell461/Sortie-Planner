import { Day } from "./classes/calendar/Day";
import { ValidGeneral } from "./classes/validators/ValidGeneral";
import { Valid16 } from "./classes/validators/Valid16";
import { Sortie } from "./classes/sortie/Sortie";
import { Month } from "./classes/calendar/Month";
import { Week } from "./classes/calendar/Week";
import { SpecialDays } from "./classes/calendar/SpecialDays";
import { Squad } from "./classes/sortie/Squad";

// Check out https://www.robinwieruch.de/node-express-server-rest-api

/* Function used to help partion number of flights for each squad */
function partionFlights(sqd: Squad, flightSqdAmt: number): number
{
	// Returns: The remainder of flights not scheduled

	let flightSqdRem: number = 0; // Keeps track of remainder 
	let sortieRem: number = sqd.sortieRem; // Remaining sorties to schedule for this squadron
	if(sortieRem != 0) // If any can be scheduled
	{
		//sqd.flightNum += (flightSqdAmt - sqd.sorties.length == 0) ? flightSqdAmt : flightSqdAmt - sqd.sorties.length; // Subtract the actual number of flights
		if(flightSqdAmt - sortieRem == 0) // If there are no more sorties to schedule
		{
			sqd.flightNum += flightSqdAmt;
			sqd.sortieRem = 0;
			flightSqdRem = 0; // No remaining flights
		}
		else if(flightSqdAmt - sortieRem < 0) // If there are leftover sorties
		{
			//console.log("Here2");
			sqd.flightNum += flightSqdAmt;
			sqd.sortieRem -= flightSqdAmt;
			flightSqdRem = 0;
			//console.log(sqd.sortieRem)
			//flightSqdRem += Math.abs(flightSqdAmt - sortieRem); // Add leftover to remainder
		}
		else if(flightSqdAmt - sortieRem > 0) // If there are leftover flights to schedule
		{
			//console.log("Here3");
			sqd.flightNum += sortieRem;
			sqd.sortieRem = 0; // No more sorties to schedule
			//sqd.flightNum += (Math.abs(flightSqdAmt - sqd.flightNum) != flightSqdAmt) ? flightSqdAmt - Math.abs(flightSqdAmt - sqd.sorties.length) : 0; // If flight number has not been allocated already
			flightSqdRem += flightSqdAmt - sortieRem;
		}
		//console.log(flightSqdRem);
		return Math.floor(flightSqdRem); // Return what remains
	}
	else
	{
		return 0; // No remainders to return
	}
}

var express = require('express');
var router = express.Router();
const app = express();
const SampleValid = require('./classes/validators/sampleValid')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
	return res.send("Hi");
});

app.get('/calendar', (req, res) => {
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];

	let date: Date = new Date();
	var currMonth = date.getMonth();
	var currYear = date.getFullYear()+1900; // Must add 1900 for some ridiculous reason

	/* Get the number of days */
	var monthDate = new Date(currYear, currMonth+1, 0); 
	var numDays = monthDate.getDate();

	var calDays: any[] = [];
	for(var i=0; i<numDays; i++)
	{
	  var dayDate = new Date(currYear, currMonth, i+1);
	  var day = dayDate.getDay();
	  calDays[i] = {dayNum: i+1, dayName: days[day]};
	}
	return res.send(Object.values(calDays));
});

/* Route to test our validator functionality */
app.get('/test', (req, res) => {
	let yearNum: number = 2019; // Current year
	let monthArr: Month[] = []; // Array of months for this current year

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
	var training = [new Date(2019, 5, 4), new Date(2019, 4, 4), new Date(2019, 2, 10)]; // Again, these are just for training
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
	let flightAmount:number[] = [50, 64, 31, 43, 74, 32, 33, 34, 53, 57, 33, 12]; // Fake number of flights

	for(let month=0; month < 12; month++)
	{
		squad12.push(new Squad("Squad12", [new Sortie("Squad12", false, false), new Sortie("Squad12", true, false), new Sortie("Squad12", false, true), new Sortie("Squad12", true, true)]));
		squad16.push(new Squad("Squad16", [new Sortie("Squad16", false, false), new Sortie("Squad16", true, false), new Sortie("Squad16", false, true), new Sortie("Squad16", true, true)]));
		squad128.push(new Squad("Squad128", [new Sortie("Squad128", false, false), new Sortie("Squad128", true, false), new Sortie("Squad128", false, true), new Sortie("Squad128", true, true)]));
		squadCTS.push(new Squad("SquadCTS", [new Sortie("SquadCTS", false, false), new Sortie("SquadCTS", true, false), new Sortie("SquadCTS", false, true), new Sortie("SquadCTS", true, true)]));
	
		// -- Get the numbers for calculations
		let flightNum: number = flightAmount[month]; // Get the number of flights for this month
		let sortieNum: number = squad12[month].sorties.length + squad16[month].sorties.length + squad128[month].sorties.length + squadCTS[month].sorties.length; // Get the number of sorties
		
		// -- Calculate the number of flights allocated to each squadron
		let flightSqdAmt: number =  0; // Number of flights to be allocated per squad
		let flightSqdRem: number = 0; // Remaining flights to be allocated for each squad
		let flightCount: number = flightNum; // Keeps track of number of flights left to partition
		let sortieCount: number = sortieNum; // Keeps track of number of sorties left to be planned
		let squadAmt: number = 4; // Number of squadrons to schedule
		//if(sortieCount > flightNum)
		var flag = 1;
		do // While there are flights left
		{
			// If there are more less flights than there are sorties, just divided by the number of squads
			if(flightCount >= sortieCount)
			{
				flightSqdAmt = Math.floor(flightCount / sortieCount);
				flightSqdRem = (flightCount % sortieCount) + (flightCount - flightSqdAmt * squadAmt); // If there are bugs, check this line
				//flightSqdRem = flightCount % sortieCount;
			}
			else if(flightCount < sortieCount)
			{
				if(flightCount >= squadAmt)
				{
					flightSqdAmt = Math.floor(flightCount / squadAmt);
					flightSqdRem = (flightCount % squadAmt) + (flightCount - flightSqdAmt * squadAmt); // If there are bugs, check this line
				}
				else if(flightCount < squadAmt)
				{
					flightSqdAmt = flightCount; // Give the remaining flights to the first
					flightSqdRem = 0; // No more flights to schedule
				}
			}
			//flightSqdAmt = (flightCount >= sortieCount) ? Math.floor(flightCount / sortieCount) : Math.floor(flightCount/squadAmt); 
			//flightSqdRem = (flightCount >= sortieCount) ? flightCount % sortieCount : flightCount % squadAmt;

			flightSqdRem += partionFlights(squad12[month], flightSqdAmt);
			flightSqdRem += partionFlights(squad16[month], flightSqdAmt);
			flightSqdRem += partionFlights(squad128[month], flightSqdAmt);
			flightSqdRem += partionFlights(squadCTS[month], flightSqdAmt);
			flightCount = flightSqdRem; // The total number of flights left is the remainder
			sortieCount = squad12[month].sortieRem + squad16[month].sortieRem + squad128[month].sortieRem + squadCTS[month].sortieRem; // Get remaining sorties
			//console.log("Flights remaining: ".concat(month.toString().concat(": ", flightSqdRem.toString())));
			//console.log("Sorties remaining: ".concat(month.toString().concat(": ", sortieCount.toString())));
			//break;
			//console.log(squad12[month].flightNum);
			/*if(flag == 2)
				break;
			flag += 1; // Testing conditional*/
		} while(flightCount > 0 && sortieCount > 0) // While there are flights left and sorties left
		//console.log("out of the loop");
		// Maybe check if there is a remainder here
		//console.log(squad12[month].flightNum + squad16[month].flightNum + squad128[month].flightNum + squadCTS[month].flightNum);
	}

	return res.send(JSON.stringify(1)); // Send the result (True (1) or False (0)) in the response to the user
});

module.exports = router;
app.listen(8000);