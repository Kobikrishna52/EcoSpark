<?php
require '../vendor/autoload.php';

class UserManager {
    private $mongoCollection;

    public function __construct($mongoCollection) {
        $this->mongoCollection = $mongoCollection;
    }

    public function userExistsInMongoDB($id) {
        $existingDocument = $this->mongoCollection->findOne(['_id' => $id]);
        return $existingDocument !== null;
    }

    public function userExists($id) {
        if ($this->userExistsInMongoDB($id)) {
            return true;
        }
        return false;
    }
}
error_reporting(E_ALL); // Enable error reporting
ini_set('display_errors', 1); // Display errors on the screen

use MongoDB\Client;

// Connection string to MongoDB
$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/";
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json');
$client = new Client($uri);
$database = $client->selectDatabase('EcoSpark'); // Your database name
$collection = $database->selectCollection('userData');
$userManager = new UserManager($collection);

$id = $_POST['mail'];
if ($userManager->userExists($id)) {
    echo "true";
} else {
    echo "false";
}