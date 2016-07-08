// TODO: add pamaeter got start time
// TODO: calendar of calendars, year of months
// TODO: week with times
var moment = require('moment');

const WEEK = 7;

var weekLength = 3;
var weekStart = 1;

function calendar (
  weekStart,
  weekLength,
  formatHeader,
  formatBody,
  formatFooter,
  mode
) {

  weekStart    = weekStart || 0;
  weekLength   = weekLength || 7;
  var weekEnd  = weekStart + weekLength - 1;
  var iterator = moment();
  var month    = iterator.get('month');
  var calendar = '';

  // Header:
  iterator.startOf('month').startOf('week').add(weekStart, 'days');
  printWeek(formatHeader);
  iterator.subtract(weekEnd, 'days');

  // Body:
  iterator.startOf('month').startOf('week').add(weekStart, 'days');
  while (iterator.get('month') < month+1) {
    printWeek(formatBody);
    iterator.add(WEEK - weekEnd + weekStart - 1, 'days');
  }

  // Footer:
  iterator.startOf('month').startOf('week').add(weekStart, 'days');
  if (formatFooter) printWeek(formatFooter);
  iterator.subtract(weekEnd, 'days');


  function printWeek (format) {
    var day = weekStart;
    while (day <= weekEnd) {
      calendar += format(iterator, day);
      iterator.add(1, 'days');
      day++;
    }
  }

  return calendar;
}

module.exports = calendar;

