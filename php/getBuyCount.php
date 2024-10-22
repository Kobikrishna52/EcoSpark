<?php
error_reporting(E_ALL); // Enable error reporting
ini_set('display_errors', 1); // Display errors on the screen

require '../vendor/autoload.php'; // Adjust the path if necessary
use MongoDB\Client;
$id = $_POST['id'];
// Connection string to MongoDB
//$id = 'Cc01tr04';
$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/";
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json');

$client = new Client($uri);
$database = $client->selectDatabase('EcoSpark');
$collection = $database->selectCollection('Requests to buy');
$query = ['sentTo' => $id , 'status'=>"requested"];
$documentCount = $collection->countDocuments($query);

echo json_encode([
    'status'=> true,
    'count'=>$documentCount
]);
