
<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require '../vendor/autoload.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
$secretKey = $_ENV['JWT_SECRET']; // Same key used for signing

$headers = apache_request_headers();

if (isset($headers['Authorization'])) {
    $authHeader = $headers['Authorization'];
    $jwt = str_replace('Bearer ', '', $authHeader);

    try {
        $decoded = JWT::decode($jwt, new Key($secretKey, 'HS256'));

        echo json_encode([
            'status' => 'success',
            'message' => 'Access granted to protected endpoint',
            'user' => $decoded->data // User data stored in the token
        ]);

    } catch (Exception $e) {
        http_response_code(401); // Unauthorized
        echo json_encode([
            'status' => 'fail',
            'message' => 'Invalid token: ' . $e->getMessage()
        ]);
    }
} else {
    http_response_code(401); // Unauthorized
    echo json_encode([
        'status' => 'fail',
        'message' => 'Token not provided'
    ]);
}
