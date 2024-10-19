<?php
error_reporting(E_ALL); // Enable error reporting
ini_set('display_errors', 1); // Display errors on the screen

use MongoDB\Client;
require '../vendor/autoload.php';
$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/";
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json');

$client = new Client($uri);
$database = $client->selectDatabase('EcoSpark'); // Your database name
$collection = $database->selectCollection('userData');
$id = $_POST['id'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];
$dob = $_POST['dob'];
$age = $_POST['age'];
$gender = $_POST['gender'];
$mobile = $_POST['mobile'];

try {
    $result = $collection->updateOne(
        ['_id' => $id],
        ['$set' => [
            'fname' => $fname,
            'lname' => $lname,
            'dob' => $dob,
            'age' => $age,
            'gender' => $gender,
            'mobile' => $mobile
        ]]
    );

    if ($result->getModifiedCount() > 0) {
        $response = [
            '_id' => $id,
            'fname' => $fname,
            'lname' => $lname,
            'dob' => $dob,
            'age' => $age,
            'gender' => $gender,
            'mobile' => $mobile
        ];
    } else {
        $response = ['error' => 'No documents matched the query.'];
    }
} catch (MongoDB\Exception\Exception $e) {
    $response = ['error' => 'Error updating document: ' . $e->getMessage()];
}

echo json_encode($response);

