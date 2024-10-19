<?php
error_reporting(E_ALL);
ini_set('display_errors', 1); 

require '../vendor/autoload.php';

use MongoDB\Client;

$id = $_POST['id'];
$uid = $_POST['uid'];
$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/";
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json');

try {
    $client = new Client($uri);
    $database = $client->selectDatabase('EcoSpark'); // Your database name
    $collection = $database->selectCollection('Requests to Sell'); // Your collection name
    $collection->insertOne(array(
        'sentTo' => $id,
        '_id'=>$uid
    ));
} catch (Exception $e) {
    echo json_encode([
        'error' => 'Failed to connect to MongoDB: ' .$e->getMessage(),
        'status'=> false
    ]);
}