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

$stmt = $mysqli->prepare("DELETE from events where eID=?");
$stmt->bind_param('s', $eid);
$eid = $_POST['eid'];
$stmt->execute();

?>
