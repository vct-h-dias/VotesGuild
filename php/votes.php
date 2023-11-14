<?php
include_once('./connections.php');
include_once('./encript.php');

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-type: application/json');

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM Candidatos";
    $res = mysqli_query($conn, $sql);
    
    $candidates = array();
    while ($row = mysqli_fetch_assoc($res)) {
        $candidates[] = $row;
    }

    http_response_code(200);
    echo json_encode(array(
        'sucess' => true,
        'data' => $candidates
    ));
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if(isset($data['email']) && isset($data['candidate'])){

        $email = $data['email'];
        $candidate = $data['candidate'];
    
        $sql = "INSERT INTO Votos (email_usuario, numero_candidato) VALUES ('$email', '$candidate')";
        $res = mysqli_query($conn, $sql);
        
        http_response_code(200);
        echo json_encode(array(
            'sucess' => true,
            'message' => 'Vote has been computed'
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