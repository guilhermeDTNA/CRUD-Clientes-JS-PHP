<?php

//Arquivo que realiza a busca por um cliente e retorna seus dados

include_once './connection.php';

try{
    //O valor é passado pela URL via GET
    $id = addslashes($_GET['id']);

    $sql = "SELECT * FROM cliente WHERE id = $id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute();
    $arrValues = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $query = $pdo->query($sql);
    //O return vai retornar os valores encontrados para cada campo
    $return = $query->fetch();

    //Cria o array customer com os dados encontrados
    $customer = [
        "id" => $return['id'],
        "name" => $return['nome'],
        "cpf" => $return['cpf'],
        "birthdate" => $return['nascimento'],
        "phone" => $return['celular'],
        "email" => $return['email'],
        "address" => $return['endereco'],
        "obs" => $return['observacao']
    ]; 

    //Retorna via JSON
    header('Content-Type: application/json');
    echo json_encode($customer);


} catch(PDOException $e){
  die("ERRO: Não pôde ser executado $sql. " . $e->getMessage());
}

unset($pdo);
?>
