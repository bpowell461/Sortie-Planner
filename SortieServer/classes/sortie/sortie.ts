export class Sortie {
    /**
    * Class used to represent days in a sortie calendar 
    * @param {string} squadron   Name of squadron
	* @param {boolean} timeOfDay   What time the sortie takes place
	* @param {boolean} crew   Whether or not the crew is present on the sortie
    */
   
    squadron: string; // Squad name
    timeOfDay: boolean; // true = nighttime
	crew: boolean; //false = pilot sortie

    constructor(squad: string, tod: boolean, crew: boolean)
    {
        this.squadron = squad;
		this.timeOfDay = tod;
		this.crew = crew;
    }
}