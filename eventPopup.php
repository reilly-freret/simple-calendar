<?php

header('Content-Type: application/json');

require 'database.php';
ini_set("session.cookie_httponly", 1);
session_start();
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

$stmt = $mysqli->prepare("SELECT eID, name, edate, etime, username, is_complete, remind, remindAtDate, remindAtTime, timeString from events where eID=?");
$stmt->bind_param('i', $eid);
$eid = $_POST['eid'];
//echo $eid;
$stmt->execute();

//$stmt->bind_result($ename, $edate, $etime, $user, $complete, $remind, $remindAtDate, $remindAtTime);

$result = $stmt->get_result();
$row = $result->fetch_assoc();
//echo $row;
echo json_encode($row);

?>
