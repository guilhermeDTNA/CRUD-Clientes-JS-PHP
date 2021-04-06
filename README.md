<b>Autor:</b> Guilherme Rocha Leite, <b>E-mail:</b> gleite98@gmail.com, <b>Website:</b> <a href="https://www.guilhermerocha.tk">https://www.guilhermerocha.tk</a>.

Sistema para realizar CRUD de clientes no MySQL, tendo o PHP manipulando somente o backend com PDO e o JavaScript, com React, manipulando somente o frontend.

Entre as características principais, estão:

<ul>
<li>Todas as requisições do frontend para o backend são feitas em AJAX, sem qualquer utilização de submit em formulários e de refresh na tela de cadastro;</li>
<li>O código está em inglês e a interface do sistema em português, bem como a base de dados;</li>
<li>Os dados manipulados são: nome, data de nascimento, CPF, celular, e-mail, endereço e observação; e</li>
<li>O CPF é validado através de uma função apropriada, o e-mail, nome e observação possuem restrições de preenchimento, sendo que todos só são cadastrados após estarem em confomidade.</li>
</ul> 

Para executar o sistema, é necessário ter um servidor web instalado em máquina local, como o Apache.

<b>Passo 1:</b> Para instalar o Apache em ambiente Linux, realize os passos disponíveis em: <a href="https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04-pt">https://www.digitalocean.com/community/tutorials/how-to-install-the-apache-web-server-on-ubuntu-18-04-pt</a>. Para Windows, existe o tutorial: <a href="https://pt.wikihow.com/Instalar-o-Apache-Web-Server-em-um-Computador-com-Windows">https://pt.wikihow.com/Instalar-o-Apache-Web-Server-em-um-Computador-com-Windows</a>. 

<b>Passo 2:</b> Após isso, mova a pasta requests, dentro de backend, para o diretório /var/www/html, no caso de estar em ambiente Linux, ou, se estiver no Windows usando o <a href="https://www.apachefriends.org/pt_br/index.html">XAMPP</a>, mova para C:\xampp\htdocs\ .

Para fins de curiosidade, o arquivo banco.sql, localizado na pasta backend, possui os scripts de criação do banco de dados e da tabela usados neste projeto.

<b>Passo 3:</b> Por último, basta executar o frontend. Para isso é necessário ter o NodeJS e o npm, que podem ser instalados da seguinte forma:

Em ambiente Linux:

```console
$ sudo apt-get update
$ sudo apt-get install -y nodejs
$ sudo apt-get install -y npm
$ sudo npm install -g n
$ sudo n stable
```	

<p>Em ambiente Windows, basta ir na <a href="https://www.nodejs.org/en">página oficial do NodeJS</a>, fazer o download do Node e executar o instalador, seguindo as instruções de instalação.</p>

<b>Passo 4:</b> Após isso, basta ir no diretório do projeto frontend/front-clientes e executar os comandos:

```console
$ npm install #(Esse comando só precisa ser executado na primeira vez em que o projeto for executado)
$ npm start
```

A partir de então, o sistema estará sendo executado na URL: <a href="http://localhost:3000/">http://localhost:3000/</a>, local onde as requisições e seus resultados poderão ser analisados. O código fonte do frontend fica localizado em frontend/front-clientes/src.