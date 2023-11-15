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

if ($_SERVER['REQUEST_METHOD'] === 'SEARCH') {

    $sql = "SELECT numero_candidato, COUNT(*) as quantidade_de_votos FROM Votos GROUP BY numero_candidato ORDER BY quantidade_de_votos DESC";
    $res = mysqli_query($conn, $sql);
    
    $data = array();

    while ($row = mysqli_fetch_assoc($res)) {
      $number_voted = $row['numero_candidato'];
      $sql = "SELECT nome_candidato FROM Candidatos WHERE numero_candidato=$number_voted";
      // $res = mysqli_query($conn, $sql);
      // $dict[$row['numero_candidato']] = (int)$row['quantidade_de_votos'];
      array_push($data, array(
        'numero_candidato' => $row['numero_candidato'],
        'quantidade_de_votos' => $row['quantidade_de_votos']
        // 'nome_candidato' => $res['nome_candidato'] 
      ));
    }

    $sql = "SELECT numero_candidato FROM Candidatos";
    $res = mysqli_query($conn, $sql);

    while ($row = mysqli_fetch_assoc($res)) {

      $bool = 0;
      foreach ($data as $candidate) {
        if($candidate['numero_candidato'] == $row['numero_candidato']){
          $bool = 1;
        }
      }

      if(!$bool){
        array_push($data, array(
          'numero_candidato' => $row['numero_candidato'],
          'quantidade_de_votos' => 0
        ));
      }
    }

    http_response_code(200);
    echo json_encode(array(
        'sucess' => true,
        'data' => $data
    ));
    exit();

}

?>