<?php
error_reporting(E_ALL);
ini_set('display_errors', 1); 

require '../vendor/autoload.php';

use MongoDB\Client;

$id = $_POST['id'];
$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/";
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json');

try {
    $client = new Client($uri);
    $database = $client->selectDatabase('EcoSpark'); // Your database name
    $collection = $database->selectCollection('Collection centers'); // Your collection name

    $data = $collection->findOne(['_id' => $id]);
    $items = [];
    if ($data && isset($data->items)) {
        foreach ($data->items as $item) {
            $items[] = [
                'id' => $item->id,
                'name' => $item->name,
                'price' => $item->price
            ];
        }
    }

    echo json_encode($items);
} catch (Exception $e) {
    echo json_encode([
        'error' => 'Failed to connect to MongoDB: ' . $e->getMessage()
    ]);
}
?>