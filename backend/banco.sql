CREATE database clientesdb;
USE clientesdb;
CREATE TABLE cliente (id INT NOT NULL AUTO_INCREMENT, nome VARCHAR(150) NOT NULL, cpf BIGINT(11) NOT NULL, nascimento DATE NOT NULL, celular BIGINT(11) NOT NULL, email VARCHAR(100) NOT NULL, endereco VARCHAR(200) NOT NULL, observacao VARCHAR(300) NULL, PRIMARY KEY (`id`));
