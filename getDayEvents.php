<?php

header("Content-Type: application/json");

require 'database.php'; // TODO check on this file

ini_set("session.cookie_httponly", 1);
session_start();

// TODO check user/password before getting events

if(!hash_equals($_SESSION['token'], $_POST['token'])){
  echo json_encode(array(
    "success" => false,
    "message" => "Request Forgery Detected"));
	die("Request forgery detected");
}
//check username that client provided with what the session has stored
//dont worry WE WILL NEVER USE THE NAME FROM THE CLIENT SIDE TO for db stuff,
//We have session for that #line28
$cuser = $_POST['username'];
if (($cuser)!==$_SESSION['username']) {
  echo json_encode(array(
    "success" => false,
    "message" => "Request Forgery Detected"));
  die("Request forgery detected");
}

$string = "";
$argString = "";

$s = $_POST['s'];
$w = $_POST['w'];
$p = $_POST['p'];

if ($s == 0 && $w == 0 && $p == 0) {
  $string = "school = 10";
}
if ($s == 0 && $w == 0 && $p == 1) {
  $string = "personal = 1";
}
if ($s == 0 && $w == 1 && $p == 0) {
  $string = "word = 1";
}
if ($s == 0 && $w == 1 && $p == 1) {
  $string = "(word = 1 or personal = 1)";
}
if ($s == 1 && $w == 0 && $p == 0) {
  $string = "school = 1";
}
if ($s == 1 && $w == 0 && $p == 1) {
  $string = "(school = 1 or personal = 1)";
}
if ($s == 1 && $w == 1 && $p == 0) {
  $string = "(school = 1 or word = 1)";
}
if ($s == 1 && $w == 1 && $p == 1) {
  $string = "(school = 1 or word = 1 or personal = 1)";
}

$stmt = $mysqli->prepare("SELECT eID, name, edate, etime, username, is_complete, remind, remindAtDate, remindAtTime, timeString from events where edate=? and username=? and " . $string);
$stmt->bind_param('ss', $currdate, $_SESSION['username']);

/*$stmt = $mysqli->prepare("SELECT eID, name, edate, etime, username, is_complete, remind, remindAtDate, remindAtTime, timeString from events where edate=? and username=?");
$stmt->bind_param('ss', $currdate, $_SESSION['username']);*/
//$stmt->bind_param('s', $currdate);
$currdate = $_POST['date']; // TODO check POST variable names

$stmt->execute();

// TODO find out if the following works or what cause fuuuuuck

/* Basically, iteratively constructs an associative array of associative arrays, encodes it to JSON, and echoes it to the JavaScript file for parsing. $count keeps track of how many events there are on a given day and returns it as one of the associations in $final, such that we can make a loop in JS that knows where to look for attributes. Structure for output should look like:
final:
  0:
    name:
    edate:
    ...
  1:
    name:
    edate:
    ...
  ...
  count: $count
*/

$result = $stmt->get_result();
$final = array();
$count = 0;
while ($row = $result->fetch_assoc()) {
  $final = array_merge_recursive($final, $row);
  $count++;
}
$final += array("count" => $count);
echo json_encode($final);
exit;

?>
