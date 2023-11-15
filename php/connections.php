<?php
    $hostname = 'localhost';
    $user = 'root';
    $password = ''; // insert mysql password here
    $database = 'GREMIO';

    $conn = mysqli_connect($hostname, $user, $password, $database);

    if (!$conn) {
        die("Conexão falhou: " . mysqli_connect_error());
    }
?>