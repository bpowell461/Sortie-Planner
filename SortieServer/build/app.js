"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Day_1 = require("./classes/calendar/Day");
const Month_1 = require("./classes/calendar/Month");
const Week_1 = require("./classes/calendar/Week");
// Check out https://www.robinwieruch.de/node-express-server-rest-api
var express = require('express');
var router = express.Router();
const app = express();
const SampleValid = require('./classes/validators/sampleValid');
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
    let date = new Date();
    var currMonth = date.getMonth();
    var currYear = date.getFullYear() + 1900; // Must add 1900 for some ridiculous reason
    /* Get the number of days */
    var monthDate = new Date(currYear, currMonth + 1, 0);
    var numDays = monthDate.getDate();
    var calDays = [];
    for (var i = 0; i < numDays; i++) {
        var dayDate = new Date(currYear, currMonth, i + 1);
        var day = dayDate.getDay();
        calDays[i] = { dayNum: i + 1, dayName: days[day] };
    }
    return res.send(Object.values(calDays));
});
/* Route to test our validator functionality */
app.get('/test', (req, res) => {
    let yearNum = 2019; // Current year
    let monthArr = []; // Array of months for this current year
    /* For each month in the  year */
    for (let month = 0; month < 12; month++) {
        monthArr[month] = new Month_1.Month([]);
        let weekCount = 0; // Counter for weeks of this month
        let dayCount = 0; // Counter for the number of days in the week
        let dayNum = (new Date(yearNum, month + 1, 0)).getDate(); // Number of days in the month
        monthArr[month].weeks[weekCount] = new Week_1.Week([]); // Initialize new week
        monthArr[month].weeks[weekCount].days = []; // Initialize array of days for this week
        /* For each day in THIS month */
        for (let day = 1; day <= dayNum; day++) {
            monthArr[month].weeks[weekCount].days[dayCount] = new Day_1.Day(day, month, yearNum); // Add a day to this week of the month
            if (monthArr[month].weeks[weekCount].days[dayCount].dayName.toUpperCase() === "SATURDAY") // If it is the "last" day of this week
             {
                weekCount += 1; // Update week count
                dayCount = 0; // Reset day count
                monthArr[month].weeks[weekCount] = new Week_1.Week([]); // Initialize new week
                monthArr[month].weeks[weekCount].days = []; // Initialize array of days for this week
            }
            else {
                dayCount += 1; // Update day count
            }
        }
    }
    for (var week in monthArr[2].weeks) {
        console.log(monthArr[2].weeks[week]);
    }
    //console.log(monthArr);
    return res.send(JSON.stringify(1)); // Send the result (True (1) or False (0)) in the response to the user
});
module.exports = router;
app.listen(8000);
