<?php
error_reporting(E_ALL); // Enable error reporting
ini_set('display_errors', 1); // Display errors on the screen

require '../vendor/autoload.php'; // Adjust the path if necessary
use MongoDB\Client;
// Connection string to MongoDB
$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/";
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json');

$client = new Client($uri);
$database = $client->selectDatabase('EcoSpark');
$collection = $database->selectCollection('Requests to buy');
$cursor = $collection->find();
$result = [];
foreach ($cursor as $document) {
    // Check if 'Name' and 'Location' keys exist
    if (isset($document['id'])) {
        $result[] = [
            'id'=>$document['id'],
            'items'=>$document['items'],
            'pincode'=>$document['pincode'],
            'state'=>$document['state'],
            'district'=>$document['district'],
            'status'=>$document['status']
        ];
    }
}
echo json_encode($result);