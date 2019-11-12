import { Day } from "./classes/calendar/Day";
import { ValidGeneral } from "./classes/validators/ValidGeneral";
import { Valid16 } from "./classes/validators/Valid16";
import { Sortie } from "./classes/sortie/Sortie";

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
 var sample= new Day(21, 'October', 2019); // Sample day
 var sortie = new Sortie("Test", false, false);
 //var goodDay = GeneralValid.check(sample); // Call our sample validating function, passing the variable 'sample' as an argument
 var goodDay = Valid16.check(sample, sortie); 
 return res.send(JSON.stringify(goodDay)); // Send the result (True (1) or False (0)) in the response to the user
});

module.exports = router;
app.listen(8000);