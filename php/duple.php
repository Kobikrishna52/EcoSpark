<?php
require '../vendor/autoload.php'; // Include Composer's autoloader

use MongoDB\Client;

$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/"; // Connection string to MongoDB

try {
    // Create a new MongoDB client instance
    $client = new Client($uri);

    // Select the database and collection
    $database = $client->selectDatabase('EcoSpark'); // Your database name
    $collection = $database->selectCollection('Collection centers'); // Your collection name

    // Define the document to be inserted
    /*$document = [
        '_id' => 'Cc01tr04',
        'manager' => 'Kobikrishna M',
        'volunteers_count' => 0 ,
        'manager_id' => 'KobiKrishna52@ecospark.in',
        'password' => 'Krishna@52',
        'items' => [
            'item1'=>
            ['id'=>1234567,
            'name'=> "old usa fan",
            'price'=> "200",
            ]
        ]

    ];*/

$filter = ['_id' => 'Cc01tr04'];

// Define the update operation to add a field inside the "items" object
$update = [
    '$set' => [
        'items.item2' => ['id'=>1234567,
            'name'=> 'old usa fan',
            'price'=> 200] // Add your new field and value here
    ]
];

// Update the document
$result = $collection->updateOne($filter, $update);

    // Insert the document into the collection
    //$insertResult = $collection->insertOne($document);

    // Output the result
    //echo "Inserted document with ID: " . $insertResult->getInsertedId();
} catch (Exception $e) {
    // Catch and display connection errors
    //echo "Failed to connect to MongoDB: " . $e->getMessage();
}
?>
