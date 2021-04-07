<?php

//Arquivo que realiza a busca por um cliente por nome ou e-mail e retorna seus dados

include_once './connection.php';

try{
    //O valor é passado pela URL via GET
	$data = addslashes($_GET['data']);

	$sql = "SELECT * FROM cliente WHERE nome LIKE '%$data%' or email LIKE '%$data%'";

	$stmt = $pdo->prepare($sql);

	$stmt->execute();
	$arrValues = $stmt->fetchAll(PDO::FETCH_ASSOC);

	if(sizeof($arrValues)>=2){
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
	} else if(sizeof($arrValues)==1){
		$query = $pdo->query($sql);
    //O return vai retornar os valores encontrados para cada campo
		$return = $query->fetch();

		$customer = [
			"id" => $return['id'],
			"name" => $return['nome'],
			"cpf" => $return['cpf'],
			"birthdate" => $return['nascimento'],
			"phone" => $return['celular'],
			"email" => $return['email'],
			"address" => $return['endereco'],
			"obs" => $return['observacao']
		];

		//Retorna os valores em JSON
		header('Content-Type: application/json');
		echo json_encode($customer);

	}
	else{
		echo -1;
	}
	

} catch(PDOException $e){
	die("ERRO: Não pôde ser executado $sql. " . $e->getMessage());
}



unset($pdo);
?>