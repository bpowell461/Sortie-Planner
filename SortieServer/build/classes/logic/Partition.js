"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Partion number of flights for each squad */
class Partition {
    static partitionFlights(sqd, flightSqdAmt) {
        // Returns: The remainder of flights not scheduled
        let flightSqdRem = 0; // Keeps track of remainder 
        let sortieRem = sqd.sortieRem; // Remaining sorties to schedule for this squadron
        if (sortieRem != 0) // If any can be scheduled
         {
            //sqd.flightNum += (flightSqdAmt - sqd.sorties.length == 0) ? flightSqdAmt : flightSqdAmt - sqd.sorties.length; // Subtract the actual number of flights
            if (flightSqdAmt - sortieRem == 0) // If there are no more sorties to schedule
             {
                sqd.flightNum += flightSqdAmt;
                sqd.sortieRem = 0;
                flightSqdRem = 0; // No remaining flights
            }
            else if (flightSqdAmt - sortieRem < 0) // If there are leftover sorties
             {
                //console.log("Here2");
                sqd.flightNum += flightSqdAmt;
                sqd.sortieRem -= flightSqdAmt;
                flightSqdRem = 0;
                //console.log(sqd.sortieRem)
                //flightSqdRem += Math.abs(flightSqdAmt - sortieRem); // Add leftover to remainder
            }
            else if (flightSqdAmt - sortieRem > 0) // If there are leftover flights to schedule
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
        else {
            return 0; // No remainders to return
        }
    }
}
exports.Partition = Partition;
