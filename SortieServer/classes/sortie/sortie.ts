export class Sortie {
    /**
     * @param {string} squadron   Name of squadron
     */
    squadron: string; // Squad name

    /**
     * @param {boolean} timeOfDay   What time the sortie takes place (true = nighttime = 'N' ::: false = daytime = 'D')
     */
    timeOfDay: boolean | string; // true = nighttime = 'N' ::: false = daytime = 'D'

    /**
     * @param {boolean} crew   Whether or not the crew is present on the sortie (false = pilot sortie = 'P' ::: true = crew sortie = 'C')
     */
	crew: boolean | string; // false = pilot sortie = 'P' ::: true = crew sortie = 'C'

    /**
     * Class used to represent days in a sortie calendar 
     * @param squad 
     * @param timeOfDay
     * @param crew 
     */
    constructor(squad: string, timeOfDay: boolean | string, crew: boolean | string)
    {
        this.squadron = squad;

        if(typeof timeOfDay === "string")
        {
            if(timeOfDay.toUpperCase() == 'N' || timeOfDay.toUpperCase() == 'NIGHT')
                this.timeOfDay = true; // Night sortie
            else
                this.timeOfDay = false; // Day sortie
        }
        else
        {
            this.timeOfDay = timeOfDay;
        }

        if(typeof crew === "string")
        {
            if(crew.toUpperCase() == 'P' || crew.toUpperCase() == 'PILOT')
                this.crew = false; // Pilot sortie
            else
                this.crew = true; // Crew sortie
        }
        else
        {
            this.crew = crew;
        }
    }
}