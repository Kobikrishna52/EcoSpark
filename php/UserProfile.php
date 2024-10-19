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
if ($id) {
        $user = $collection->findOne(['_id' => $id], 
        [
            'projection' => [
                'age' => 1,
                'gender' => 1,
                'mobile' => 1,
                '_id' => 1,
                'fname' => 1,
                'lname' => 1,
                'dob' => 1,
                'state'=>1,
                'district'=>1,
                'pincode'=>1,
                'address'=>1
            ]
        ]);
        if ($user) {
            $userData = json_encode($user);
            echo json_encode(['source' => 'database', 'data' => $user]);
        } else {
            echo json_encode(['error' => 'User not found']);
        }
} else {
    echo json_encode(['error' => 'Session expired']);
}
