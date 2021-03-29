<?php

include_once './connection.php';

$id = addslashes($_POST['id']);
$nome = addslashes($_POST['nome']);
$cpf = addslashes($_POST['cpf']);
$nascimento = addslashes($_POST['nascimento']);
$celular = addslashes($_POST['celular']);
$email = addslashes($_POST['email']);
$endereco = addslashes($_POST['endereco']);
$observacao = addslashes($_POST['observacao']);

if ($nome==''||$cpf==''||$nascimento==''||$celular==''||$email==''||$endereco=='') {
	return "Dados nulos";
}


try {
	$msql = "UPDATE cliente SET nome = '$nome', cpf = '$cpf', nascimento = '$nascimento', celular = '$celular', email = '$email', endereco = '$endereco', observacao = $observacao WHERE id = $id";
	$stmt = $pdo->prepare($sql);

	$stmt->bindParam(':nome', addslashes($_REQUEST['nome']));
	$stmt->bindParam(':cpf', addslashes($_REQUEST['cpf']));
	$stmt->bindParam(':nascimento', addslashes($_REQUEST['nascimento']));
	$stmt->bindParam(':celular', addslashes($_REQUEST['celular']));
	$stmt->bindParam(':email', addslashes($_REQUEST['email']));
	$stmt->bindParam(':endereco', addslashes($_REQUEST['endereco']));
	$stmt->bindParam(':observacao', addslashes($_REQUEST['observacao']));
	$stmt->execute();

	$retorno="Alterado com sucesso!";

} catch (Exception $e) {
	die("ERROR: Could not able to execute $sql. " . $e->getMessage());
}

// Close connection
unset($pdo);

return $retorno;
?>