"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* Partion number of flights for each squad */
class Partition {
    static partitionFlights(sqd, flightSqdAmt) {
        let flightSqdRem = 0; // Keeps track of remainder 
        let sortieRem = sqd.sortieRem; // Remaining sorties to schedule for this squadron
        if (sortieRem != 0) // If any can be scheduled
         {
            if (flightSqdAmt - sortieRem == 0) // If there are no more sorties to schedule
             {
                sqd.flightNum += flightSqdAmt;
                sqd.sortieRem = 0;
                flightSqdRem = 0; // No remaining flights
            }
            else if (flightSqdAmt - sortieRem < 0) // If there are leftover sorties
             {
                sqd.flightNum += flightSqdAmt;
                sqd.sortieRem -= flightSqdAmt;
                flightSqdRem = 0;
            }
            else if (flightSqdAmt - sortieRem > 0) // If there are leftover flights to schedule
             {
                sqd.flightNum += sortieRem;
                sqd.sortieRem = 0; // No more sorties to schedule
                flightSqdRem += flightSqdAmt - sortieRem;
            }
            return Math.floor(flightSqdRem); // Return what remains
        }
        else {
            return 0; // No remainders to return
        }
    }
}
exports.Partition = Partition;
