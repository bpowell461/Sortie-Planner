"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Day_1 = require("./classes/calendar/Day");
const Sortie_1 = require("./classes/sortie/Sortie");
const Month_1 = require("./classes/calendar/Month");
const Week_1 = require("./classes/calendar/Week");
const SpecialDays_1 = require("./classes/calendar/SpecialDays");
const Squad_1 = require("./classes/sortie/Squad");
const Partition_1 = require("./classes/logic/Partition");
const Schedule_1 = require("./classes/logic/Schedule");
const CalUtil_1 = require("./classes/calendar/CalUtil");
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
    let monthArr = []; //[new Month([], new SpecialDays([], [], [])), ]; // Array of months for this current year
    /* For each month in the  year */
    for (let month = 0; month < 12; month++) {
        monthArr[month] = new Month_1.Month([], new SpecialDays_1.SpecialDays([], [], [])); // Initiate a new month
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
    /* Add dummy data for drill, holidays, and training */
    // Note that you can adjust these two arrays however you want to test your scheduling algorithm
    var holidays = [new Date(2019, 1, 2), new Date(2019, 5, 5), new Date(2019, 7, 15)]; // These aren't real holiday, just for testing purposes
    var training = [new Date(2019, 5, 4), new Date(2019, 4, 4), new Date(2019, 2, 10)]; // Again, these are just for testing purposes
    for (var month in monthArr) {
        monthArr[month].special.drill = monthArr[month].weeks[1].days; // Set the second week of each month to a dirll week
        for (var week in monthArr[month].weeks) {
            for (var day in monthArr[month].weeks[week].days) {
                var dayObj = monthArr[month].weeks[week].days[day]; // Get the day
                var dateObj = dayObj.dateObj; // Get the date object of the day
                /* If the date is a holiday */
                if (holidays.includes(dateObj)) {
                    monthArr[month].special.holiday.push(dayObj); // Append it to the holidays array for special
                }
                /* If the date is a training day */
                if (training.includes(dateObj)) {
                    monthArr[month].special.holiday.push(dayObj); // Append it to the training array for special
                }
            }
        }
    }
    /* Generate the sorties */
    // Array of squads for each month
    // Test sorties (Could get this from a database)
    let squad12 = [];
    let squad16 = [];
    let squad128 = [];
    let squadCTS = []; // Training squadron
    // Adjust these arrays of flight and numbers how you want for testing your scheduling algorithm
    let flightAmount = [10, 64, 31, 43, 74, 32, 33, 34, 53, 57, 33, 62]; // Fake number of flights
    //for(let month=0; month < 12; month++)
    for (var month in monthArr) {
        // -- Sortie generation
        squad12.push(new Squad_1.Squad("Squad12", [new Sortie_1.Sortie("Squad12", false, false), new Sortie_1.Sortie("Squad12", true, false), new Sortie_1.Sortie("Squad12", false, true), new Sortie_1.Sortie("Squad12", true, true)]));
        squad16.push(new Squad_1.Squad("Squad16", [new Sortie_1.Sortie("Squad16", false, false), new Sortie_1.Sortie("Squad16", true, false), new Sortie_1.Sortie("Squad16", false, true), new Sortie_1.Sortie("Squad16", true, true)]));
        squad128.push(new Squad_1.Squad("Squad128", [new Sortie_1.Sortie("Squad128", false, false), new Sortie_1.Sortie("Squad128", true, false), new Sortie_1.Sortie("Squad128", false, true), new Sortie_1.Sortie("Squad128", true, true)]));
        squadCTS.push(new Squad_1.Squad("SquadCTS", [new Sortie_1.Sortie("SquadCTS", false, false), new Sortie_1.Sortie("SquadCTS", true, false), new Sortie_1.Sortie("SquadCTS", false, true), new Sortie_1.Sortie("SquadCTS", true, true)]));
        // -- Logic for 75% of CTS pilot sorties at night
        let CTSNightCount = 0;
        for (var sortie in squadCTS[month].sorties) {
            if (squadCTS[month].sorties[sortie].crew === false) // Pilot sortie
             {
                CTSNightCount += 1;
            }
        }
        //squadCTS[month].flightNum = Math.floor(CTSNightCount * .75); // 75% of the sorties
        // -- Get the numbers for calculations
        let flightNum = flightAmount[month]; // Get the number of flights for this month
        let sortieNum = squad12[month].sorties.length + squad16[month].sorties.length + squad128[month].sorties.length + squadCTS[month].sorties.length; // Get the number of sorties
        // -- Calculate the number of flights allocated to each squadron
        let flightSqdAmt = 0; // Number of flights to be allocated per squad
        let flightSqdRem = 0; // Remaining flights to be allocated for each squad
        let flightCount = flightNum; // Keeps track of number of flights left to partition
        let sortieCount = sortieNum; // Keeps track of number of sorties left to be planned
        let squadAmt = 4; // Number of squadrons to schedule
        let speedMode = false; //shortcuts the generation algorithm
        do // While there are flights left
         {
            // If there are more flights than there are sorties, no calculations need to be done
            if (flightCount >= sortieCount) {
                speedMode = true;
                flightSqdRem = 0;
            }
            else if (flightCount < sortieCount) //otherwise, each squadron will only get a portion
             {
                if (flightCount >= squadAmt) {
                    flightSqdAmt = Math.floor(flightCount / squadAmt); //number of flights that each squadron can get
                    flightSqdRem = flightCount % squadAmt; //calculate leftovers
                }
                else if (flightCount < squadAmt) //big problems, not enough flights to even give 1 per squadron
                 {
                    flightSqdAmt = 0;
                    flightSqdRem = flightCount; // No more flights to schedule
                    flightSqdRem = Partition_1.Partition.partitionFlights(squad12[month], flightSqdRem, false);
                    if (flightSqdRem > 0) {
                        flightSqdRem = flightSqdRem - Partition_1.Partition.partitionFlights(squad16[month], flightSqdRem, false);
                        if (flightSqdRem > 0) {
                            flightSqdRem = flightSqdRem - Partition_1.Partition.partitionFlights(squad128[month], flightSqdRem, false);
                            if (flightSqdRem > 0) {
                                flightSqdRem = flightSqdRem - Partition_1.Partition.partitionFlights(squad12[month], flightSqdRem, false); //give the flights to whatever can take them
                                if (flightSqdRem > 0) {
                                    console.log("BAD"); //should never happen
                                }
                            }
                        }
                    }
                }
            }
            flightSqdRem += Partition_1.Partition.partitionFlights(squad12[month], flightSqdAmt, speedMode);
            flightSqdRem += Partition_1.Partition.partitionFlights(squad16[month], flightSqdAmt, speedMode);
            flightSqdRem += Partition_1.Partition.partitionFlights(squad128[month], flightSqdAmt, speedMode);
            flightSqdRem += Partition_1.Partition.partitionFlights(squadCTS[month], flightSqdAmt, speedMode);
            flightCount = flightSqdRem; // The total number of flights left is the remainder
            //sortieCount = squad12[month].sortieRem + squad16[month].sortieRem + squad128[month].sortieRem + squadCTS[month].sortieRem; // Get remaining sorties
        } while (flightCount > 0); // loop never terminates via sortie count
        speedMode = false;
    }
    // -- Remove the sorties that will not be flown
    let sortieRem = []; // List of remaining sorties not flown
    for (let month = 0; month < 12; month++) {
        if ((squad12[month].sorties != undefined) && (squad12[month].sorties.length != 0)) // If there are sorties
         {
            for (let sortRem = 0; sortRem < squad12[month].sortieRem; sortRem++) {
                let sortie = squad12[month].sorties.pop(); // Take one off the end
                if (sortie !== undefined) {
                    sortieRem.push(sortie);
                }
            }
        }
    }
    for (let month = 0; month < 12; month++) {
        if ((squad16[month].sorties != undefined) && (squad16[month].sorties.length != 0)) // If there are sorties
         {
            for (let sortRem = 0; sortRem < squad16[month].sortieRem; sortRem++) {
                let sortie = squad16[month].sorties.pop(); // Take one off the end
                if (sortie !== undefined) {
                    sortieRem.push(sortie);
                }
            }
        }
    }
    for (let month = 0; month < 12; month++) {
        if ((squad128[month].sorties != undefined) && (squad128[month].sorties.length != 0)) // If there are sorties
         {
            for (let sortRem = 0; sortRem < squad128[month].sortieRem; sortRem++) {
                let sortie = squad128[month].sorties.pop(); // Take one off the end
                if (sortie !== undefined) {
                    sortieRem.push(sortie);
                }
            }
        }
    }
    for (let month = 0; month < 12; month++) {
        if ((squadCTS[month].sorties != undefined) && (squadCTS[month].sorties.length != 0)) // If there are sorties
         {
            for (let sortRem = 0; sortRem < squadCTS[month].sortieRem; sortRem++) {
                let sortie = squadCTS[month].sorties.pop(); // Take one off the end
                if (sortie !== undefined) {
                    sortieRem.push(sortie);
                }
            }
        }
    }
    // -- Schedule the sorties for the year
    for (let month = 0; month < 12; month++) {
        /* The order of precedence for scheduling is from first to last*/
        // NOTE: We concatenate the remaining sorties returned from the scheduling here. Could be useful later.
        sortieRem.concat(Schedule_1.Schedule.scheduleFlights(squad12[month], monthArr[month], month));
        sortieRem.concat(Schedule_1.Schedule.scheduleFlights(squad16[month], monthArr[month], month));
        sortieRem.concat(Schedule_1.Schedule.scheduleFlights(squad128[month], monthArr[month], month));
        sortieRem.concat(Schedule_1.Schedule.scheduleFlights(squadCTS[month], monthArr[month], month));
    }
    /* Test the scheduling algorithm */
    var output = "";
    var sOutputM = ""; // Save output for month
    var sOutputD = ""; // Save output for day
    var count = 0; // Month count
    for (let month of monthArr) {
        output = "";
        output = output + "Month: " + CalUtil_1.CalUtil.month2Str(count) + " ";
        sOutputM = output; // Save month info
        for (let week of month.weeks) {
            for (let day of week.days) {
                output = sOutputM;
                output = output + day.dayName + ":" + day.dayNum.toString() + " ";
                sOutputD = output; // Save day info
                for (let sortie of day.sorties) {
                    output = sOutputD;
                    output = output + sortie.squadron; // Name of the squadron
                    console.log(output);
                }
            }
        }
        count += 1;
    }
    return res.send(JSON.stringify(1)); // Send the result (True (1) or False (0)) in the response to the user
});
module.exports = router;
app.listen(8000);
