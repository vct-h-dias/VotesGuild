<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

$hostname = "localhost";
$user = "root";
$pass = "";
$database = "";
$conn = mysqli_connect($hostname, $user, $pass, $database);
if (!$conn) {
  die("Conexão falhou: " . mysqli_connect_error());
}

// vote logic
// POST for more security
if ($_SERVER['REQUEST_METHOD'] === 'POST') {

}

?>