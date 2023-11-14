<?php
include_once('./connections.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  if(isset($data['email']) && isset($data['password'])){

    $email = $data['email'];
    $password = $data['password'];

    $sql = "SELECT salt FROM Estudante WHERE email_usuario='$email'";
    $res = mysqli_query($conn, $sql);
    if(!$res->num_rows){
      http_response_code(404);
      echo json_encode(array(
        'sucess' => false,
        'error' => "Student with email '$email' not found"
      ));
      exit();
    }

    $salt = mysqli_fetch_assoc($res)['salt'];
    $hashPassword = hash('sha256', $password . $salt);

    $sql = "SELECT id, nome, email_usuario FROM Estudante WHERE email_usuario='$email' AND senha_usuario='$hashPassword'";
    $res = mysqli_query($conn, $sql);
    if(!$res->num_rows){
      http_response_code(401);
      echo json_encode(array(
        'sucess' => false,
        'error' => "Data not match"
      ));
      exit();
    }

    $userData = mysqli_fetch_assoc($res);

    $sql = "SELECT * FROM Votos WHERE email_usuario='$email'";
    $res = mysqli_query($conn, $sql);
    $voted = $res->num_rows ? mysqli_fetch_assoc($res)['numero_candidato'] : false;
    $userData['voted'] = $voted;
    
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