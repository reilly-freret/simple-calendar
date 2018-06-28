(function() {
  Date.prototype.deltaDays = function(c) {
    return new Date(this.getFullYear(), this.getMonth(), this.getDate() + c)
  };
  Date.prototype.getSunday = function() {
    return this.deltaDays(-1 * this.getDay())
  }
})();

function Week(c) {
  this.sunday = c.getSunday();
  this.nextWeek = function() {
    return new Week(this.sunday.deltaDays(7))
  };
  this.prevWeek = function() {
    return new Week(this.sunday.deltaDays(-7))
  };
  this.contains = function(b) {
    return this.sunday.valueOf() === b.getSunday().valueOf()
  };
  this.getDates = function() {
    for (var b = [], a = 0; 7 > a; a++) b.push(this.sunday.deltaDays(a));
    return b
  }
}

function Month(c, b) {
  this.year = c;
  this.month = b;
  this.nextMonth = function() {
    return new Month(c + Math.floor((b + 1) / 12), (b + 1) % 12)
  };
  this.prevMonth = function() {
    return new Month(c + Math.floor((b - 1) / 12), (b + 11) % 12)
  };
  this.getDateObject = function(a) {
    return new Date(this.year, this.month, a)
  };
  this.getWeeks = function() {
    var a = this.getDateObject(1),
      b = this.nextMonth().getDateObject(0),
      c = [],
      a = new Week(a);
    for (c.push(a); !a.contains(b);) a = a.nextWeek(), c.push(a);
    return c
  }
};

var currMonth = new Month(2018, 2);
var start;
var dictionary = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
};

function testDates() {
  document.getElementById("month").innerHTML = dictionary[currMonth.month];
  document.getElementById("year").innerHTML = currMonth.year;
  for (var i = 1; i < 43; i++) {
    document.getElementById(i).innerHTML = "";
  }
  var weeks = currMonth.getWeeks();
  start = 1;
  var flag = false;
  for (w in weeks) {
    days = weeks[w].getDates();
    for (d in days) {
      if (days[d].getDate() == 1) {
        if (!flag) {
          flag = true;
        } else {
          flag = false;
        }
      }
      if (flag) {
        document.getElementById(start).innerHTML = days[d].getDate();
        populateEvents(currMonth.year, currMonth.month + 1, days[d].getDate());
      }
      start++;
    }
  }
}

function backMonth() {
  currMonth = currMonth.prevMonth();
  testDates();
}

function frontMonth() {
  currMonth = currMonth.nextMonth();
  testDates();
}

function populateEvents(year, month, day) {
  var final = year + "-" + month + "-" + day;
  console.log(final);

  var xhr = new XMLHttpRequest();;
  xhr.open("POST", "getDayEvents.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.addEventListener("load", ajaxEvents, false);
  xhr.send(final);
}

function ajaxEvents() {
  var parsed = JSON.parse(event.target.responseText);
  var total = parsed.count.count;
  for (var i = 0; i < total; i++) {
    document.getElementById(start).innerHTML += parsed.i.name; // TODO "name" looks like a native type for JSON returns... gotta change that in the database
  }
}

document.addEventListener("DOMContentLoaded", testDates);
