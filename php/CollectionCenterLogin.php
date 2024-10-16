<?php
require '../vendor/autoload.php';

class UserManager {
    private $mongoCollection;

    public function __construct($mongoCollection) {
        $this->mongoCollection = $mongoCollection;
    }

    public function userExistsInMongoDB($email, $password) {
        // Find user by email and password
        $existingDocument = $this->mongoCollection->findOne(['manager_id' => $email, 'password' => $password]);
        return $existingDocument;
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
$collection = $database->selectCollection('Collection centers');
$userManager = new UserManager($collection);

$email = $_POST['mail'];
$password = $_POST['password'];

$user = $userManager->userExistsInMongoDB($email, $password);

if ($user) {
    // Return success status and user data
    $response = [
        'status' => 'success',
        'manager_name' => $user['manager'],
        'id'=> $user['_id'],
    ];
    echo json_encode($response);
} else {
    // Return failure status
    $response = [
        'status' => 'fail',
        'message' => 'Invalid email or password'
    ];
    echo json_encode($response);
}
