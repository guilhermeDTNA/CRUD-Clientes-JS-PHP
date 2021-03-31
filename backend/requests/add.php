<?php 

//Arquivo que recebe informações sobre um novo cliente para cadastro

try {
	include_once './connection.php';

	//Monta o SQL a ser executado com os parâmetros passados via POST
	$sql = "INSERT INTO cliente (nome, cpf, nascimento, celular, email, endereco, observacao) VALUES (:nome, :cpf, :nascimento, :celular, :email, :endereco, :observacao)";
	$stmt = $pdo->prepare($sql);

    //O bindParam recebe os valores dos parâmetros como referência
    //O addslashes retira todas as aspas simples, evitando SQLInjection
	$stmt->bindParam(':nome', addslashes($_REQUEST['nome']));
	$stmt->bindParam(':cpf', addslashes($_REQUEST['cpf']));
	$stmt->bindParam(':nascimento', addslashes($_REQUEST['nascimento']));
	$stmt->bindParam(':celular', addslashes($_REQUEST['celular']));
	$stmt->bindParam(':email', addslashes($_REQUEST['email']));
	$stmt->bindParam(':endereco', addslashes($_REQUEST['endereco']));
	$stmt->bindParam(':observacao', addslashes($_REQUEST['observacao']));

	//Executa o script SQL com o PDO
	$stmt->execute();

	$return="Inserido com sucesso!";
} catch (PDOException $e) {
	die("ERRO: Não pôde ser executado $sql. " . $e->getMessage());
}	

unset($pdo);

return $return;
?>