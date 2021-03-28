<?php

include_once './conexao.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Origin, Cache-Control, Pragma, Authorization, Accept, Accept-Encoding");


try{

    $stmt = $pdo->prepare("SELECT * FROM cliente");

    $stmt->execute();
    $arrValues = $stmt->fetchAll(PDO::FETCH_ASSOC);



    $cliente=$inicioOBJ;
    
    for ($i=0; $i<sizeof($arrValues); $i++){


        foreach ($arrValues[$i] as $key => $useless) {
            $cliente=$key.": ".$arrValues[$i][$key]." ";
            $clientes[$i][] = $cliente;
        }

    }

    header('Content-Type: application/json');
    echo json_encode($clientes);


} catch(PDOException $e){
  die("ERROR: Could not able to execute $sql. " . $e->getMessage());
}

unset($pdo);
?>
