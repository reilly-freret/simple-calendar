var token;
var cuser;
var filterschool = 1;
var filterwork = 1;
var filterpersonal = 1;



function loginAjax(event) {
  var username = document.getElementById("lusername").value; // Get the username from the form
  var password = document.getElementById("lpassword").value; // Get the password from the form

  // Make a URL-encoded string for passing POST data:
  var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "login.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event) {
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
      //alert("You've been Logged In!");
      document.getElementById("nameplate").textContent = "Logged in as   " + jsonData.username;
      token = jsonData.token;
      if (jsonData.username) {
        //alert("here");
      }
      //alert(jsonData.username);
      cuser = jsonData.username;
      $("#logintab").hide();
      $("#registertab").hide();
      $("#logouttab").show();
      $("#newevent").show();
      $("#filters").show();
      $("#login").dialog('close');
      //testDates();
    } else {
      alert("You were not logged in.  " + jsonData.message);
      document.getElementById("nameplate").textContent = " ";
    }

  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString); // Send the data
  document.getElementById("lusername").value = "";
  document.getElementById("lpassword").value = "";
  islogged();
}

function registerAjax(event) {
  var username = document.getElementById("rusername").value; // Get the username from the form
  var password = document.getElementById("rpassword").value; // Get the password from the form

  // Make a URL-encoded string for passing POST data:
  var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);

  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "register.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event) {
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
      alert("You've been Registered!");
    } else {
      alert("You were not Registered in.  " + jsonData.message);
    }
  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString); // Send the data
}

function islogged(event){
  // Make a URL-encoded string for passing POST data:
  var jsonData;
  var dataString = "Anyone Logged In?";
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "isLogged.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event) {
    jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
      token=jsonData.token;
      cuser=jsonData.username;
      //alert("AJAX deal" + cuser);
      $("#logintab").hide();
      $("#registertab").hide();
      $("#logouttab").show();
      $("#newevent").show();
      $("#filters").show();
      testDates(true);
    } else {
      testDates(false);
    }
  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString); // Send the data
  return null;
}


function filter(event)
{
  if (document.getElementById("filterschool").checked != true) {
    filterschool = 0;
  } else {
    filterschool = 1;
  }
  if (document.getElementById("filterwork").checked != true) {
    filterwork = 0;
  } else {
    filterwork = 1;
  }
  if (document.getElementById("filterpersonal").checked != true) {
    filterpersonal = 0;
  } else {
    filterpersonal = 1;
  }
  islogged();
}


function twilio()
{var phonenumber = document.getElementById("textnumber").value;
 var  name = document.getElementById("eventName1").textContent;
 var  date = document.getElementById("eventDate1").textContent;
 var  time = document.getElementById("eventTime1").textContent;


 alert("Message Sent!");

 var dataString ="&number=" + encodeURIComponent(phonenumber)+ "&name=" + encodeURIComponent(name)+ "&time=" + encodeURIComponent(time)+"&date=" + encodeURIComponent(date);

 var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
 xmlHttp.open("POST", "phone.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
 xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
 xmlHttp.addEventListener("load", function(event) {
   var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
   if (jsonData.success) {
      alert("Message Sent!");
     }
   })
xmlHttp.send(dataString);
}

function logout(event) {
  document.getElementById("lusername").value = "";
  document.getElementById("lpassword").value = "";
  document.getElementById("rusername").value = "";
  document.getElementById("lusername").value = "";

  loginAjax(); //this will destory session on load
  //testDates(); //re populate fields
  $("#logouttab").hide();
  $("#logintab").show();
  $("#registertab").show();
  $("#newevent").hide();
  $("#filters").hide();
  token = null;
  cuser = null;
  alert("You've been Logged Out!");
  //testDates();
  islogged();
}

function newEvent(event) {
  var eventName = document.getElementById("eventName").value;
  var eventDate = document.getElementById("eventDate").value;
  //alert(eventDate);
  var eventTime = document.getElementById("eventTime").value;
  var remind;
  var school;
  var work;
  var personal;
  /*if (document.getElementById("checkbox").checked != true) {
    remind = 0;
  } else {
    remind = 1;
  }*/
  if (document.getElementById("school").checked != true) {
    school = 0;
  } else {
    school = 1;
  }
  if (document.getElementById("work").checked != true) {
    work = 0;
  } else {
    work = 1;
  }
  if (document.getElementById("personal").checked != true) {
    personal = 0;
  } else {
    personal = 1;
  }
  //alert(remind);
  var remindDate = document.getElementById("remindDate").value;
  var remindTime = document.getElementById("remindTime").value;
  //alert(remindTime);
  // Make a URL-encoded string for passing POST data:
  var dataString = "eventName=" + encodeURIComponent(eventName) + "&eventDate=" + encodeURIComponent(eventDate) + "&eventTime=" + encodeURIComponent(eventTime) + "&remind=" + encodeURIComponent(remind) + "&remindDate=" + encodeURIComponent(remindDate) + "&remindTime=" + encodeURIComponent(remindTime) + "&token=" + encodeURIComponent(token) + "&username=" + encodeURIComponent(cuser) + "&school=" + encodeURIComponent(school) + "&work=" + encodeURIComponent(work) + "&personal="+ encodeURIComponent(personal);
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "addEvent.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event) {
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    //alert(jsonData.success);
    if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
      alert("Event Added");
    } else {
      alert("Event Failed  " + jsonData.message);
    }
    $(document.getElementById("addEvent")).dialog('close');
    //testDates();
    islogged();
  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString); // Send the data
  //reset the form for another guy
  document.getElementById("eventName").value = "";
  document.getElementById("eventDate").value = "";
  document.getElementById("eventTime").value = "";
  //document.getElementById("checkbox").value = "";
  document.getElementById("remindDate").value = "";
  document.getElementById("remindTime").value = "";
}

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
var beginning;
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

var cmon;

function testDates(bool = false) {
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
          beginning = start;
        } else {
          flag = false;
        }
      }
      if (flag) {
        document.getElementById(start).innerHTML = "<div class=\"upperCorner\">" + days[d].getDate() + "</div>";
        if (bool) {populateEvents(currMonth.year, currMonth.month + 1, days[d].getDate(), start);}
      }
      start++;
    }
  }
//islogged();
}

function backMonth() {
  currMonth = currMonth.prevMonth();
  //testDates();
  islogged();
}

function frontMonth() {
  currMonth = currMonth.nextMonth();
  //testDates();
  islogged();
}

function populateEvents(year, month, day, start1) {
    //console.log("I am mad!");
    var final = year + "-" + month + "-" + day;
    var dateURL = "date=" + encodeURIComponent(final) + "&token=" + encodeURIComponent(token) + "&username=" + encodeURIComponent(cuser) + "&w=" + encodeURIComponent(filterwork) + "&s=" + encodeURIComponent(filterschool) + "&p=" + encodeURIComponent(filterpersonal);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "getDayEvents.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.addEventListener("load", function() {
      ajaxEvents(start1);
    }, false);
    xhr.send(dateURL);
}

var eventID;

function ajaxEvents(start2) {
  var parsed = JSON.parse(event.target.responseText);
  if (parsed.name) {
    if (isArray(parsed.name)) {
      for (var i = 0; i < parsed.name.length; i++) {
        document.getElementById(start2).innerHTML += "<button id=\"event" + parsed.eID[i] + "\" class=\"showEvent\" onclick=\"showEvent(" + parsed.eID[i] + ")\">" + parsed.name[i] + "</button><br>";
      }
    } else {
      document.getElementById(start2).innerHTML += "<button id=\"event" + parsed.eID + "\" class=\"showEvent\" onclick=\"showEvent(" + parsed.eID + ")\">" + parsed.name + "</button><br>";
    }
  }
}

function showEvent(eID) {
  //alert(eID);
  var eidURL = "eid=" + encodeURIComponent(eID) + "&token=" + encodeURIComponent(token) + "&username=" + encodeURIComponent(cuser);
  var xhr1 = new XMLHttpRequest();
  xhr1.open("POST", "eventPopup.php", true);
  xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr1.addEventListener("load", popupFields, false);
  xhr1.send(eidURL);
}

function popupFields() {
  //alert(JSON.parse(event.target.responseText));
  var completeString;
  var eventParse = JSON.parse(event.target.responseText);
  //alert(event.target.responseText);
  //console.log(eventParse.name);
  var time24 = eventParse.timeString;
  var hours = time24.split(":");
  var hour = Number(hours[0]);
  var suffix = hour >= 12 ? "PM" : "AM";
  hour = (((hour + 11) % 12) + 1);
  var fullTime = hour + ":" + hours[1] + " " + suffix;
  document.getElementById("eventName1").innerHTML = "Name: " + eventParse.name;
  document.getElementById("eventDate1").innerHTML = "Date: " + eventParse.edate;
  document.getElementById("eventTime1").innerHTML = "Time: " + fullTime;
  if (eventParse.is_complete) {
    completeString = "Yes";
  } else {
    completeString = "No";
  }
  document.getElementById("complete1").innerHTML = "Complete: " + completeString;
  if (eventParse.reminder) {
    document.getElementById("alertDate1").innerHTML = "Remind on: " + eventParse.remindAtDate;
    document.getElementById("alertTime1").innerHTML = "Remind at: " + eventParse.remindAtTime;
  }
  document.getElementById("deleteButton").innerHTML = "<button onclick=\"deleteEventJS(" + eventParse.eID + ")\">Delete</button><button onclick=\"editEventJS(" + eventParse.eID + ")\">Edit</button>";
  $(document.getElementById("eventPopupHTML")).dialog();
}

function deleteEventJS(eid) {
  var eidURL1 = "eid=" + encodeURIComponent(eid) + "&token=" + encodeURIComponent(token) + "&username=" + encodeURIComponent(cuser);
  var xhr2 = new XMLHttpRequest();
  xhr2.open("POST", "deleteEvent.php", true);
  xhr2.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr2.send(eidURL1);
  xhr2.addEventListener("load", function() {
    $(document.getElementById("eventPopupHTML")).dialog('close');
    //testDates();
    islogged();
  }, false);
}

var globalEID;

function editEventJS(eid) {
  $(document.getElementById("eventPopupHTML")).dialog('close');
  var eidURL = "eid=" + encodeURIComponent(eid) + "&token=" + encodeURIComponent(token) + "&username=" +  encodeURIComponent(cuser);
  var xhr1 = new XMLHttpRequest();
  //alert(eidURL);
  xhr1.open("POST", "eventPopup.php", true);
  xhr1.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr1.addEventListener("load", populateEdit, false);
  xhr1.send(eidURL);
  $(document.getElementById("editEvent")).dialog();
  globalEID = eid;
}

function populateEdit() {
  var parsedForEdit = JSON.parse(event.target.responseText);
  //alert(parsedForEdit.name);
  document.getElementById("eventName2").value = parsedForEdit.name;
  document.getElementById("eventDate2").value = parsedForEdit.edate;
  document.getElementById("eventTime2").value = parsedForEdit.timeString;/**/
  if (parsedForEdit.remind) {
    document.getElementById("remindDate2").value = parsedForEdit.remindAtDate;
    document.getElementById("remindTime2").value = parsedForEdit.remindAtTime;
  }
}

function updateEvent() {
  //deleteEventJS(globalEID);
  var eventName = document.getElementById("eventName2").value;
  var eventDate = document.getElementById("eventDate2").value;
  //alert(eventDate);
  var eventTime = document.getElementById("eventTime2").value;
  var remind;
  /*if (document.getElementById("checkbox2").checked != 1) {
    remind = 0;
  } else {
    remind = 1;
  }*/
  if (document.getElementById("school1").checked != true) {
    school = 0;
  } else {
    school = 1;
  }
  if (document.getElementById("work1").checked != true) {
    work = 0;
  } else {
    work = 1;
  }
  if (document.getElementById("personal1").checked != true) {
    personal = 0;
  } else {
    personal = 1;
  }
  var remindDate = document.getElementById("remindDate2").value;
  var remindTime = document.getElementById("remindTime2").value;
  // Make a URL-encoded string for passing POST data:
  var dataString = "eventName=" + encodeURIComponent(eventName) + "&eventDate=" + encodeURIComponent(eventDate) + "&eventTime=" + encodeURIComponent(eventTime) + "&remind=" + encodeURIComponent(remind) + "&remindDate=" + encodeURIComponent(remindDate) + "&remindTime=" + encodeURIComponent(remindTime) + "&token=" + encodeURIComponent(token) + "&username=" + encodeURIComponent(cuser) + "&school=" + encodeURIComponent(school) + "&work=" + encodeURIComponent(work) + "&personal=" + encodeURIComponent(personal);
  var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
  xmlHttp.open("POST", "addEvent.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
  xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
  xmlHttp.addEventListener("load", function(event) {
    var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
    if (jsonData.success) { // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
      //alert("Event Added");
    } else {
      alert("Event Failed  " + jsonData.message);
    }
    $(document.getElementById("editEvent")).dialog('close');
    //testDates();
    deleteEventJS(globalEID);
  }, false); // Bind the callback to the load event
  xmlHttp.send(dataString);
}

// isArray borrowed from stackoverflow: https://stackoverflow.com/questions/1058427/how-to-detect-if-a-variable-is-an-array
function isArray(obj) {
  return Object.prototype.toString.call(obj) === '[object Array]';
}
// end citation

window.onload = testDates;
window.onload = islogged;
