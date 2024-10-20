<?php
require '../vendor/autoload.php'; // Include Composer's autoloader

use MongoDB\Client;

$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/"; // Connection string to MongoDB
$items = $_POST['items'];
$sentTo = $_POST['id'];
$pincode = $_POST['pincode'];
$state = $_POST['state'];
$district = $_POST['district'];
$uid = $_POST['uid'];
$location = $_POST['location'];
    // Create a new MongoDB client instance
    $client = new Client($uri);

    // Select the database and collection
    $database = $client->selectDatabase('EcoSpark'); // Your database name
    $collection = $database->selectCollection('Requests to buy'); // Your collection name

    // Define the document to be inserted
    $document = [
        "id"=>$uid,
        "items"=> $items ,
        "sentby"=> $uid,
        "sentTo"=>$sentTo,
        'pincode'=>$pincode,
        'state'=>$state,
        'district'=>$district,
        'tolocation'=>$location,
        'status'=>"requested"
    ];
// Update the document
$result = $collection->InsertOne($document);
echo json_encode($result);
?>
