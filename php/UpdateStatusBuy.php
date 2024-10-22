<?php
error_reporting(E_ALL); // Enable error reporting
ini_set('display_errors', 1); // Display errors on the screen

require '../vendor/autoload.php'; // Adjust the path if necessary
use MongoDB\Client;

$id = $_POST['id']; // Get the id from POST request

// Connection string to MongoDB
$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/";
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json');

try {
    // Create a new MongoDB client instance
    $client = new Client($uri);
    $database = $client->selectDatabase('EcoSpark');
    $collection = $database->selectCollection('Requests to buy');

    // Update the document with the matching id
    $updateResult = $collection->updateOne(
        ['id' => $id , 'status'=>'requested'], // Filter to find the document with the specified id
        ['$set' => ['status' => 'confirmed']] // Update the status to "confirmed"
    );

    // Check if the update was successful
    if ($updateResult->getModifiedCount() > 0) {
        echo json_encode(['success' => true, 'message' => 'Status updated successfully.']);
    } else {
        echo json_encode(['success' => false, 'message' => 'No document found or status already confirmed.']);
    }
} catch (Exception $e) {
    // Handle exceptions and display an error message
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
