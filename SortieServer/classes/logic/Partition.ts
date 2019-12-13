import { Squad } from "../sortie/Squad";

/* Partion number of flights for each squad */
export class Partition
{
    static partitionFlights(sqd: Squad, flightSqdAmt: number, quickFill: boolean): number
    {
        let flightSqdRem: number = 0; // Keeps track of remainder 
        let sortieRem: number = sqd.sortieRem; // Remaining sorties to schedule for this squadron
		
		if(quickFill == true) //if there is enough room for all squadrons to receive flights, this flag will shortcut the partitioning
		{
			sqd.flightNum = sqd.sorties.length; //give the squadron all the flights it needs
			sqd.sortieRem = 0;
			return 0; //nothing remains
		}
		else
		{
			if(sortieRem != 0) // If any can be scheduled
			{
				if(flightSqdAmt - sortieRem == 0) // If the squad has a flight for every sortie
				{
					sqd.flightNum += flightSqdAmt;
					sqd.sortieRem = 0;
					flightSqdRem = 0; // No remaining flights
				}
				else if(flightSqdAmt - sortieRem < 0) // If there are not enough flights to cover every sortie
				{
					sqd.flightNum += flightSqdAmt;
					sqd.sortieRem -= flightSqdAmt; //this causes the sorties with no plane to get trimmed
					flightSqdRem = 0;
				}
				else if(flightSqdAmt - sortieRem > 0) // If there are too many flights
				{
					sqd.flightNum += sortieRem;
					sqd.sortieRem = 0; // No more sorties to schedule
					flightSqdRem += flightSqdAmt - sortieRem; //this many flights get fed back into the general pool
				}
				
				return Math.floor(flightSqdRem); // Return what remains
			}
			else
			{
				return 0; // No remainders to return
			}
		}
    }
}