create database newm;
use quiz;
CREATE TABLE cliente (id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(150) NOT NULL, cpf BIGINT(11) NOT NULL, nascimento DATE NOT NULL, celular BIGINT(11) NOT NULL, email VARCHAR(100) NOT NULL, endereco VARCHAR(200) NOT NULL, observacao VARCHAR(300) NULL, PRIMARY KEY (`id`));
use newm;
insert into cliente (nome, cpf, nascimento, celular, email, endereco, observacao) values ("Teste Nome", '1112223345', '1998/02/24', '38988525742', 'teste@gmail.com', 'Rua Doutor Pedro Matta', 'Estou so observando');
