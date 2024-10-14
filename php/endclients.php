<?php
error_reporting(E_ALL); // Enable error reporting
ini_set('display_errors', 1); // Display errors on the screen

require '../vendor/autoload.php'; // Adjust the path if necessary

use MongoDB\Client;

// Connection string to MongoDB
$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/";
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json');

try {
    // Create a new MongoDB client instance
    $client = new Client($uri);

    // Select the database and collection
    $database = $client->selectDatabase('EcoSpark'); // Your database name
    $collection = $database->selectCollection('end clients'); // Your collection name

    // Fetch all documents in the collection
    $cursor = $collection->find();

    // Initialize an array to store the names and locations
    $result = [];

    // Iterate over the cursor and store each document's 'Name' and 'Location' in the result array
    foreach ($cursor as $document) {
        // Check if 'Name' and 'Location' keys exist
        if (isset($document['Name']) && isset($document['Location'])) {
            $result[] = [
                'name' => $document['Name'],
                'location' => $document['Location']
            ];
        }
    }

    // Output the result as JSON
    echo json_encode($result);
} catch (Exception $e) {
    // Catch and display connection errors
    echo json_encode([
        'error' => 'Failed to connect to MongoDB: ' . $e->getMessage()
    ]);
}
?>
