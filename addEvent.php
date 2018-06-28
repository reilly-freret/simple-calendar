<?php
ini_set("session.cookie_httponly", 1);
session_start();
error_reporting(0);
header("Content-Type: application/json");

require 'database.php'; // TODO check on this file


//check CSRF TOKEN
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


$stmt = $mysqli->prepare("INSERT into events (name, edate, timeString, username, is_complete, remind, remindAtDate, remindAtTime, school, word, personal) values(?,?,?,?,?,?,?,?,?,?,?)");
$name = $_POST['eventName'];
$edate = $_POST['eventDate'];
$etime = $_POST['eventTime'];
$username = $_SESSION['username'];
$is_complete = $_POST['complete'];
$is_complete=0;
$remind = $_POST['remind'];
$remindAtDate = $_POST['remindDate'];
$remindAtTime = $_POST['remindTime'];
$school=$_POST['school'];
$work=$_POST['work'];
$personal=$_POST['personal'];



if (!isset($remind)) {
  $remind=0;
  $remindAtDate=null;
  $remindAtDate=null;
}
$stmt->bind_param('ssssiissiii', $name, $edate, $etime, $username, $is_complete, $remind, $remindAtDate, $remindAtTime, $school, $work, $personal);
$stmt->execute();
$stmt->fetch();

echo json_encode(array(
  "success" => true,
));




?>
