// Check out https://www.robinwieruch.de/node-express-server-rest-api

var express = require('express');
var router = express.Router();

// Home page route
router.get('/', function(req, res) {
  res.send('Hello World');
});

// About page route
router.get('/calendar', function(req, res) {
	var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
	var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "Decemeber"];

	var date = new Date();
	var currMonth = date.getMonth();
	var currYear = date.getYear()+1900; // Must add 1900 for some ridiculous reason

	/* Get the number of days */
	var monthDate = new Date(currYear, currMonth+1, 0); 
	var numDays = monthDate.getDate();

	var calDays = [];
	for(var i=0;i<numDays;i++)
	{
	  dayDate = new Date(currYear, currMonth, i+1);
	  day = dayDate.getDay();
	  calDays[i] = {dayNum: i+1, dayName: days[day]};
	}
	res.send(Object.values(calDays));
});

const exec = require('child_process');
router.get('/test', function(req, res) {
	exec('ls', (error, stdout, stderr) => {
		console.error(`exec error: ${error}`);
		return;
	});
	console.log(`stdout: ${stdout}`);
	console.error(`stderr: ${stderr}`);
});

module.exports = router;