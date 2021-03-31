<?php

//Arquivo que estabelece conexão com o banco de dados

//O header permite acesso absoluto CORS para aplicações externas
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");

	//Configura a conexão via PDO
try {
    $pdo = new PDO("mysql:host=localhost;dbname=clientesdb", "root", "password");
    // Set the PDO error mode to exception
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("ERROR: Could not connect. " . $e->getMessage());
}
?>
