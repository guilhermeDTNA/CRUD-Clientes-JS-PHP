<?php 

try {
	include_once './conexao.php';

	$sql = "INSERT INTO cliente (nome, cpf, nascimento, celular, email, endereco, observacao) VALUES (:nome, :cpf, :nascimento, :celular, :email, :endereco, :observacao)";
	$stmt = $pdo->prepare($sql);

    // Bind parameters to statement
	$stmt->bindParam(':nome', addslashes($_REQUEST['nome']));
	$stmt->bindParam(':cpf', addslashes($_REQUEST['cpf']));
	$stmt->bindParam(':nascimento', addslashes($_REQUEST['nascimento']));
	$stmt->bindParam(':celular', addslashes($_REQUEST['celular']));
	$stmt->bindParam(':email', addslashes($_REQUEST['email']));
	$stmt->bindParam(':endereco', addslashes($_REQUEST['endereco']));
	$stmt->bindParam(':observacao', addslashes($_REQUEST['observacao']));

// Execute the prepared statement
	$stmt->execute();

	$retorno="Inserido com sucesso!";
} catch (PDOException $e) {
	die("ERROR: Could not able to execute $sql. " . $e->getMessage());
}	

unset($pdo);

return $retorno;
?>