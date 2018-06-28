<?php
// login_ajax.php

header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json

// Check to see if the username and password are valid.  (You learned how to do this in Module 3.)
error_reporting(0);
session_start();
session_destroy();
ini_set("session.cookie_httponly", 1);
session_start();
require 'database.php';
// Use a prepared statement
$stmt = $mysqli->prepare("SELECT COUNT(*), username, hashed_password FROM users WHERE username=?");

// Bind the parameter
$stmt->bind_param('s', $username);
$username = $_POST['username'];
$stmt->execute();

// Bind the results
$stmt->bind_result($cnt, $user_id, $pwd_hash);
$stmt->fetch();

$pwd_guess = $_POST['password'];

if($cnt == 1 && password_verify($pwd_guess, $pwd_hash)){
	session_start();
	$_SESSION['username'] = $username;
	$_SESSION['token'] = substr(md5(rand()), 0, 10);
	$toke=$_SESSION['token'];
	echo json_encode(array(
		"success" => true,
		"username" => $username,
		"token"=> $toke
	));
	exit;
}else{
	echo json_encode(array(
		"success" => False,
		"message" => "Incorrect Username or Password"
	));
	exit;
}
?>
