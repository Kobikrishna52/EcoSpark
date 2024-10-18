<?php
require '../vendor/autoload.php'; // Include Composer's autoloader

use MongoDB\Client;

$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/"; // Connection string to MongoDB
$items = $_POST['items'];
$senderId = $_POST['id'];
$location = $_POST['location'];
    // Create a new MongoDB client instance
    $client = new Client($uri);

    // Select the database and collection
    $database = $client->selectDatabase('EcoSpark'); // Your database name
    $collection = $database->selectCollection('Requests to buy'); // Your collection name

    // Define the document to be inserted
    $document = [
        "items"=> $items ,
        "sentby"=> $senderId,
    ];
// Update the document
$result = $collection->InsertOne($document);
echo json_encode($result);
?>
