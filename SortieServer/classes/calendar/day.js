module.exports = class Day {
    constructor(num, dayName, dayMonth, dayCount, timeOfDay)
    {
        this.num = num; // Number of day in the month (EX: October 29th -> 29)
        this.dayName = dayName; // Name of day in the month (EX: October 29th -> Tuesday)
        this.dayMonth = dayMonth; // Name of month (EX: October 29 -> October)
        this.dayCount = dayCount; // Rather the day is the first, second, or third of its name (EX: October 29th -> The 5th Tuesday)
        this.timeOfDay = timeOfDay; // Rather the day is at night or during the daytime
    }
}