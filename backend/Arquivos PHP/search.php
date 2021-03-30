<?php

include_once './connection.php';


try{

    $id = addslashes($_GET['id']);

    $sql = "SELECT * FROM cliente WHERE id = $id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute();
    $arrValues = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $query = $pdo->query($sql);
// O segredo esta nesta linha abaixo \/
    $return = $query->fetch();

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


    header('Content-Type: application/json');
    echo json_encode($customer);


} catch(PDOException $e){
  die("ERROR: Could not able to execute $sql. " . $e->getMessage());
}

unset($pdo);
?>
