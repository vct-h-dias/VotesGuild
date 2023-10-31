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
$database = "FINOP";
$conn = mysqli_connect($hostname, $user, $pass, $database);
if (!$conn) {
  die("Conexão falhou: " . mysqli_connect_error());
}

//sign up
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
//validar campos recebed
}


//sign in
if ($_SERVER['REQUEST_METHOD'] === 'GET') {

}
?>