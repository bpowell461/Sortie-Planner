import { Sortie } from "./Sortie";

export class Squad {
    /**
     * @param {string} squadName    Name of the squadron
     */
    squadName: string;

    /**
     * @param {Sortie[]} sortieArr  Used to keep track of sorties for this squadron
     */
    sorties: Sortie[]; // Used to keep track of sorties for this squadron

    /**
     * @param flightNum Number of flight allocated to this squadron
     */
    flightNum: number;

    /**
     * @param sortieRem Number of sorties left to sort
     */
    sortieRem: number;

    /**
     * @param {number} nightCTS Number used to keep track of the rule of 75% of Pilot sorties at night for the CTS squadron
     */
    nightCTS: number;
    
    /**
     * Class used to represent each squadron
     * @param squadName 
     * @param sorties 
     * @param flightNum
     * @param nightCTS
     */
    constructor(squadName: string, sorties: Sortie[], nightCTS: number = -1)
    {
        this.squadName = squadName;
        this.sorties = sorties;
        this.flightNum = 0; // Maybe add "this.flightNum = flightNum" but add a condition to check if the parameter passed was empty later
        this.sortieRem = this.sorties.length;
        this.nightCTS = nightCTS;
    }
}