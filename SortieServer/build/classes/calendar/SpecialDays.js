"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SpecialDays {
    /**
     * Special days is a class which holds the scheduled days for holidays, training, and drill
     * @param holiday
     * @param training
     * @param drill
     */
    constructor(holiday, training, drill) {
        this.holiday = holiday;
        this.training = training;
        this.drill = drill;
    }
}
exports.SpecialDays = SpecialDays;
