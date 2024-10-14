<?php
require '../vendor/autoload.php';
use MongoDB\Client;
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
        return $this->userExistsInMongoDB($id);
    }

    public function insertInMongoDB($id, $fname, $lname,$password) {
        $document = array(
            '_id' => $id,
            'fname' => $fname,
            'lname' => $lname,
            'mobile' => 0,
            'dob' => '-',
            'password'=> $password
        );
        $this->mongoCollection->insertOne($document);
    }

    public function register($id, $password, $fname, $lname) {
        if ($this->userExists($id)) {
            return false;
        }

        $this->insertInMongoDB($id, $fname, $lname,$password);
        
        return true;
    }
}
error_reporting(E_ALL); // Enable error reporting
ini_set('display_errors', 1); // Display errors on the screen


// Connection string to MongoDB
$uri = "mongodb+srv://kobikrishna52:Krishna%4052@cluster0.9twqr.mongodb.net/";
header('X-Content-Type-Options: nosniff');
header('Content-Type: application/json');
$client = new Client($uri);
$database = $client->selectDatabase('EcoSpark'); // Your database name
$collection = $database->selectCollection('userData');
$userManager = new UserManager($collection);
$id = $_POST['mail'];
$password = $_POST['password'];
$fname = $_POST['fname'];
$lname = $_POST['lname'];

if ($userManager->register($id, $password, $fname, $lname)) {
    echo json_encode(['status' => 'success', 'id' => $id]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'User already exists.']);
}
