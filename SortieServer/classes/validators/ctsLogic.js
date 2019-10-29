const Day = require('../calendar/day');

module.exports = class ctsLogic {
    static isValid(day)
    {
      var flag = 1;
      if (isHoiday(day.num - 1) && flight.type == 'C') return 0;
      return 1;
    }
}
