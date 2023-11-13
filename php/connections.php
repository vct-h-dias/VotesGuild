<?php
    $hostname = 'localhost';
    $user = 'root';
    $password = 'jojo1234';
    $database = 'GREMIO';

    $conn = mysqli_connect($hostname, $user, $password, $database);

    if (!$conn) {
        die("Conexão falhou: " . mysqli_connect_error());
    }
?>