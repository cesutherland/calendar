'use strict';

var calendar = require('./calendar');

class Thing {
  say (say) {
    console.log(say);
  }
}

var calendars = [
  [0, 7],
  [0, 5],
  [1, 5],
  [2, 4],
  [3, 4],
  [5, 4],
  //[0, 14]
];

var json = JSON.stringify(calendars.map(a => {
  var start  = a[0];
  var length = a[1];
  var output = calendar(
    start,
    length,
    (iterator, day) => {
      var result = '';
      var month = iterator.format('MMMM');
      if (day === start) {
        result += (new Array(Math.floor((length * 4 - month.length)/2))).join(' ') + month + `\n`;
      }
      return result + iterator.format('dd') + ((day + 1) % (start + length) ? '  ' : '\n');
    },
    (iterator, day) => {
      var date = iterator.get('date');
      return (date < 10 ? ' ' + date : date) + ((day + 1) % (start + length) ? '  ' : '\n');
    }
  );
  /*
  console.log('');
  console.log('start:\t', start);
  console.log('end:\t', start + length - 1);
  */
  console.log(output);
  return {
    'start'    : start,
    'end'      : length,
    'calendar' : output
  };
}));



calendars.map(a => {
  var start = a[0];
  var length = a[1];
  var output = calendar(
    start,
    length,
    (iterator, day) => {
      var result = '';
      if (day === start) {
        result += `<tr><th colspan="${length}">${iterator.format('MMMM')}</th></tr>`
        result += '<tr>';
      }
      result += '<th>' + iterator.format('dd') + '</th>';
      if ((day + 1) % (start + length) === 0) result += '</tr>';
      return result;
    },
    (iterator, day) => {
      var result = '';
      if (day === start) result += '<tr>';
      result += '<td>' + iterator.get('date') + '</td>';
      if ((day + 1) % (start + length) === 0) result += '</tr>';
      return result;
    }
  );

  document.getElementById('calendars').innerHTML += '<table>' + output + '</table>';
});
