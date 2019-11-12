import { Day } from "./classes/calendar/Day";
import { ValidGeneral } from "./classes/validators/ValidGeneral";
import { Valid16 } from "./classes/validators/Valid16";
import { Sortie } from "./classes/sortie/Sortie";
import { Month } from "./classes/calendar/Month";
import { Week } from "./classes/calendar/Week";
import { SpecialDays } from "./classes/calendar/SpecialDays";

// Check out https://www.robinwieruch.de/node-express-server-rest-api

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
	for(var i=0;i<numDays;i++)
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

	// Adjust these arrays of flight and numbers how you want for testing your scheduling algorithm
	var flightAmount = [50, 64, 31, 43, 74, 32, 33, 34, 53, 57, 33, 12]; // Fake number of flights
	var sortieAmount = [20, 4, 21, 30, 36, 31, 21, 20, 14, 20, 6, 10]; // Fake number of sorties

	return res.send(JSON.stringify(1)); // Send the result (True (1) or False (0)) in the response to the user
});

module.exports = router;
app.listen(8000);