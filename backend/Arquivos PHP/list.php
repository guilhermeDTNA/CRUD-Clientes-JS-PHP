<?php

include_once './connection.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");


try{

    $stmt = $pdo->prepare("SELECT * FROM cliente");

    $stmt->execute();
    $arrValues = $stmt->fetchAll(PDO::FETCH_ASSOC);



    $customer=$inicioOBJ;
    
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
