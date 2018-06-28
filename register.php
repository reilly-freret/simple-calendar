<?php
  header("Content-Type: application/json"); // Since we are sending a JSON response here (not an HTML document), set the MIME Type to application/json
 error_reporting(0);
 require 'database.php';
	//die("Request forgery detected");

 $user = $_POST['username'];
 $password = $_POST['password'];
 $hash=password_hash($password, PASSWORD_BCRYPT);

 $stmt = $mysqli->prepare("insert into users (username, hashed_password) values (?, ?)");
 if(!$stmt){
 	printf("Query Prep Failed: %s\n", $mysqli->error);
 	exit;
 }
 $stmt->bind_param('ss', $user, $hash);
 $stmt->execute();
 $stmt->close();
 echo json_encode(array(
   "success" => true
 ));

 ?>
