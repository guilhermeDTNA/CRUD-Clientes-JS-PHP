<?php

//Arquivo que realiza alteração nos cados do cliente cujo ID foi passado via POST

include_once './connection.php';

$id = addslashes($_POST['id']);
$name = addslashes($_POST['nome']);
$cpf = addslashes($_POST['cpf']);
$birthday = addslashes($_POST['nascimento']);
$phone = addslashes($_POST['celular']);
$email = addslashes($_POST['email']);
$address = addslashes($_POST['endereco']);
$obs = addslashes($_POST['observacao']);


//Verifica se há algum campo obrigatório nulo
if ($id==''||$name==''||$cpf==''||$birthday==''||$phone==''||$email==''||$address=='') {
	return "Dados nulos";
}


try {
	//Dependendo do valor da observação, a consulta SQL vai mudar
	if ($obs != ''){
	$sql = "UPDATE cliente SET nome = '$name', cpf = '$cpf', nascimento = '$birthday', celular = '$phone', email = '$email', endereco = '$address', observacao = '$obs' WHERE id = $id";
	} else {
		$sql = "UPDATE cliente SET nome = '$name', cpf = '$cpf', nascimento = '$birthday', celular = '$phone', email = '$email', endereco = '$address', observacao = null WHERE id = $id";
	}

	$stmt = $pdo->prepare($sql);

	$stmt->bindParam($name, addslashes($_REQUEST['nome']));
	$stmt->bindParam($cpf, addslashes($_REQUEST['cpf']));
	$stmt->bindParam($birthday, addslashes($_REQUEST['nascimento']));
	$stmt->bindParam($phone, addslashes($_REQUEST['celular']));
	$stmt->bindParam($email, addslashes($_REQUEST['email']));
	$stmt->bindParam($address, addslashes($_REQUEST['endereco']));
	$stmt->bindParam($obs, addslashes($_REQUEST['observacao']));
	$stmt->execute();

	$return="Alterado com sucesso!";

} catch (Exception $e) {
	die("ERRO: Não pôde ser executado $sql. " . $e->getMessage());
}

//Fecha a conexão
unset($pdo);

return $return;
?>