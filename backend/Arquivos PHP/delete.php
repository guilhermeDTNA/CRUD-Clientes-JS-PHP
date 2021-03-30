<?php

include_once './connection.php';

try {
	
    // Create prepared statement
    $id = addslashes($_POST['id']);

    $sql = "DELETE FROM cliente WHERE id = $id";

    $stmt = $pdo->prepare($sql);

    $stmt->execute();

    $return="Excluído com sucesso!";

} catch (PDOException $e) {

    die("ERROR: Could not able to execute $sql. " . $e->getMessage());
}

// Close connection
unset($pdo);

return $return;

?>