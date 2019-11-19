"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Squad {
    /**
     * Class used to represent each squadron
     * @param squadName
     * @param sorties
     * @param flightNum
     * @param nightCTS
     */
    constructor(squadName, sorties, nightCTS = -1) {
        this.squadName = squadName;
        this.sorties = sorties;
        this.flightNum = 0; // Maybe add "this.flightNum = flightNum" but add a condition to check if the parameter passed was empty later
        this.sortieRem = this.sorties.length;
        this.nightCTS = nightCTS;
    }
}
exports.Squad = Squad;
