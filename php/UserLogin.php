<?php
require '../vendor/autoload.php';

// Load environment variables
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Get the JWT secret from the .env file
$jwtSecret = $_ENV['JWT_SECRET'];

class UserManager {
    private $mongoCollection;

    public function __construct($mongoCollection) {
        $this->mongoCollection = $mongoCollection;
    }

    public function userExistsInMongoDB($email, $password) {
        // Find user by email and password
        $existingDocument = $this->mongoCollection->findOne(['_id' => $email, 'password' => $password]);
        return $existingDocument;
    }
}

// Enable error reporting
error_reporting(E_ALL); 
ini_set('display_errors', 1); 

use MongoDB\Client;
use Firebase\JWT\JWT;

// Connection string to MongoDB
$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/";
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json');

$client = new Client($uri);
$database = $client->selectDatabase('EcoSpark'); // Your database name
$collection = $database->selectCollection('userData');
$userManager = new UserManager($collection);

// Get email and password from POST request
$email = $_POST['mail'];
$password = $_POST['password'];
//$email = "nirup2244@gmail.com";
//$password = "#Nirup2244";
// Check if user exists
$user = $userManager->userExistsInMongoDB($email, $password);

if ($user) {
    // Generate JWT token
    $payload = [
        'iat' => time(), // Issued at: time when the token was generated
        'exp' => time() + (60 * 60), // Expiration time: 1 hour from now
        'email' => $email // Add other user information as needed
    ];

    $token = JWT::encode($payload, $jwtSecret,'HS256');

    // Return success status and user data along with token
    $response = [
        'status' => 'success',
        'fname' => $user['fname'], // Adjust according to your database structure
        'lname' => $user['lname'], // Adjust according to your database structure
        'token' => $token // Include the JWT token in the response
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
