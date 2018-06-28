<?php

$number = "+1" . $_POST['number'];
//$number="+19174943867";
//"+"."1".$number
$name = $_POST['name'];
$date = $_POST['date'];
$time = $_POST['time'];

//start code from Twilio.com// https://www.twilio.com/docs/libraries/php#using-without-composer
require __DIR__ . '/twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;

// Your Account SID and Auth Token from twilio.com/console
$account_sid = 'AC403fbbf16e277a4ec8a6db6be40c8d48';
$auth_token = 'ff8147c99c9ed9e2b2a8919c21720134';
// In production, these should be environment variables. E.g.:
// $auth_token = $_ENV["TWILIO_ACCOUNT_SID"]

// A Twilio number you own with SMS capabilities
$twilio_number = "+13142078420";

$client = new Client($account_sid, $auth_token);
$client->messages->create(
    // Where to send a text message (your cell phone?)
    $number,
    array(
        'from' => $twilio_number,
        'body' => ("Event Name: ".$name."\r\n"."Event Date: ".$date.".\r\n"."Event Time: ".$time)
    )
);
//end code from Twilio.com//
echo json_encode(array(
  "success" => True));
?>
