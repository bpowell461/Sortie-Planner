import { Day } from "../calendar/day";

export class Sortie {
    /**
    * Class used to represent days in a sortie calendar 
    * @param {string} squad   Name of squadron
    * @param {Day} date Day of flight
    * @param {boolean} available Sortie's availability
    */
   
    squad: string; // Squad name
    date: Day; // Day of flight
    available: boolean; // Rather thet flight is available or not

    constructor(squad: string, date: Day, available: boolean)
    {
        this.squad = squad;
        this.date = date;
        this.available = available;
    }
}