<?php

//Arquivo que lista todos os clientes cadastrados

include_once './connection.php';

try{

    $stmt = $pdo->prepare("SELECT * FROM cliente");

    $stmt->execute();

    //Como pode ter mais de 1, armazena-os em um array
    $arrValues = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    for ($i=0; $i<sizeof($arrValues); $i++){
        //A key diz respeito à coluna (campo) e é concatenada com : e seu valor
        foreach ($arrValues[$i] as $key => $useless) {
            $customer=$key.": ".$arrValues[$i][$key]." ";
            $customers[$i][] = $customer;
        }
    }
    //Retorna os valores em JSON
    header('Content-Type: application/json');
    echo json_encode($customers);


} catch(PDOException $e){
  die("ERRO: Não pôde ser executado $sql. " . $e->getMessage());
}

unset($pdo);
?>
