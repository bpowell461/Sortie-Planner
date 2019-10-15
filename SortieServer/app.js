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
	return res.send("Hi");
});

app.get('/calendar', (req, res) => {
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
	return res.send(Object.values(calDays));
});

//const {exec} = require('child_process');
const { spawn } = require('child_process');
const bat = spawn('cmd.exe', ['/c', 'ls']);

app.get('/test', function(req, res) {
	bat.stdout.on('data', (data) => {
		console.log(data.toString());
	});

	bat.stderr.on('data', (data) => {
	  console.error(data.toString());
	});

	bat.on('exit', (code) => {
	  console.log(`Child exited with code ${code}`);
	});
	//return res.sendStatus(a);
	// console.log(data));
	/*
	exec('ls', (error, stdout, stderr) => {
		if(error)
		{
			console.error(`exec error: ${error}`);
			return;
		}
		console.log(`stdout: ${stdout}`);
		console.error(`stderr: ${stderr}`);
		return res.send("Hi");
	});
	*/
});

module.exports = router;
app.listen(8000);