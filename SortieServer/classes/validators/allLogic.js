const Day = require('../calendar/Day');

module.exports = class allLogic {
    static isValid(day)
    {
      var flag = 1;
      if (day.dayName == 'Saturday' && isDrill(day.num) == 0) return 0;
      if (day.dayName == 'Friday' && day.timeOfDay == 'Night' && isDrill(day.num +1) == 0) return 0;
      if (isHoliday(day.num + 1) == 1 || isTraining(day.num + 1) == 1) return 0;
      if (day.dayName == 'Sunday') return 0;
      return 1;
    }
}
