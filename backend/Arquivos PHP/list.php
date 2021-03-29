<?php

include_once './connection.php';

try{

    $stmt = $pdo->prepare("SELECT * FROM cliente");

    $stmt->execute();
    $arrValues = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    for ($i=0; $i<sizeof($arrValues); $i++){


        foreach ($arrValues[$i] as $key => $useless) {
            $customer=$key.": ".$arrValues[$i][$key]." ";
            $customers[$i][] = $customer;
        }

    }

    header('Content-Type: application/json');
    echo json_encode($customers);


} catch(PDOException $e){
  die("ERROR: Could not able to execute $sql. " . $e->getMessage());
}

unset($pdo);
?>
