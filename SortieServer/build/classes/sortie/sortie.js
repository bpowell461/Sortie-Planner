"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Sortie {
    /**
     * Class used to represent days in a sortie calendar
     * @param squad
     * @param timeOfDay
     * @param crew
     */
    constructor(squad, timeOfDay, crew) {
        this.squadron = squad;
        if (typeof timeOfDay === "string") {
            if (timeOfDay.toUpperCase() == 'N' || timeOfDay.toUpperCase() == 'NIGHT')
                this.timeOfDay = true; // Night sortie
            else
                this.timeOfDay = false; // Day sortie
        }
        else {
            this.timeOfDay = timeOfDay;
        }
        if (typeof crew === "string") {
            if (crew.toUpperCase() == 'P' || crew.toUpperCase() == 'PILOT')
                this.crew = false; // Pilot sortie
            else
                this.crew = true; // Crew sortie
        }
        else {
            this.crew = crew;
        }
    }
}
exports.Sortie = Sortie;
