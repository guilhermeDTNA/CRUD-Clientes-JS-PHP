<?php

//Arquivo que deleta cliente de acordo com o id passado

include_once './connection.php';

try {
	
    $id = addslashes($_POST['id']);

    $sql = "DELETE FROM cliente WHERE id = $id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute();

    $return="Excluído com sucesso!";

} catch (PDOException $e) {
    die("ERRO: Não pôde ser executado $sql. " . $e->getMessage());
}

// Close connection
unset($pdo);

return $return;

?>