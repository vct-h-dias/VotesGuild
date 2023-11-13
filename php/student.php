<?php
include_once('./connections.php');
include_once('./encript.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(isset($data['email']) && isset($data['password']) && isset($data['name'])){

    $email = $data['email'];
    $name = $data['email'];
    $password = $data['password'];

    $sql = "SELECT * FROM Estudante WHERE email_usuario='$email'";
    $res = mysqli_query($conn, $sql);
    if($res->num_rows){
      http_response_code(409);
      echo json_encode(array(
        'sucess' => false,
        'error' => "Student with email '$email' already exists"
      ));
      exit();
    }

    $salt = randomRegex();
    $hashPassword = hash('sha256', $password . $salt);

    $sql = "INSERT INTO Estudante (nome, email_usuario, senha_usuario, salt) VALUES ('$name', '$email', '$hashPassword', '$salt')";
    $res = mysqli_query($conn, $sql);
    
    
    $sql = "SELECT id, nome, email_usuario FROM Estudante WHERE email_usuario='$email'";
    $res = mysqli_query($conn, $sql);
    $userData = mysqli_fetch_assoc($res);

    $userData['voted'] = false;
    
    http_response_code(200);
    echo json_encode(array(
      'sucess' => true,
      'data' => $userData
    ));
    exit();

  } else {
    http_response_code(400);
    echo json_encode(array(
      'sucess' => false,
      'error' => "Missing parameters"
    ));
    exit();
  }

}

?>