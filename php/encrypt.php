<?php

function randomRegex() {
    $chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'; // Caracteres permitidos
    $regex = '';

    for ($i = 0; $i < 16; $i++) {
        $index = rand(0, strlen($chars) - 1);
        $regex .= $chars[$index];
    }

    return $regex;
}

?>
