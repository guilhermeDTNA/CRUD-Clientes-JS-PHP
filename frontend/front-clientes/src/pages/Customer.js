import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

//Classe que exibe e envia requisições para o PHP
export default class Customer extends Component{

  constructor(props){
    super(props);
    
  }

  render(){

    /*
    var body = this.props.rows.map((item, key) =>{
      return (
        <td key={key}>{item}</td>
        );
    })
    
           <table className="myTable">
        <thead>
        <tr>
        <th>id</th>
        <th>Nome</th>
        <th>Cpf</th>
        <th>Data de nascimento</th>
        <th>Celular</th>
        <th>E-mail</th>
        <th>Endereço</th>
        <th>Observação</th>
        </tr>
        </thead>
        <tbody>
        <tr>
        {body}
        </tr>
        </tbody>
        </table>
        */   

        let rows = this.props.rows;

        if(rows.length >0){
          return(
            <>

            {rows = rows.map(function(item, i){

              item = item.split('{')+'';
              item = item.split('}')+'';
              
              

              //Separando informações das colunas
              item = item.split('id:')+'';
              item = item.split('nome:')+'';
              item = item.split('cpf:')+'';
              item = item.split('nascimento:')+'';
              item = item.split('celular:')+'';
              item = item.split('email:')+'';
              item = item.split('endereco:')+'';
              item = item.split('observacao:')+'';

              //Retirando vírgulas
              item = item.split(',,')+'';
              item = item.split(' ,')+'';
              item = item.split(', ')+'';
              item = item.split(',');

              //O i é o id de cada objeto, é o que será enviado quando tiver requisições de edição ou remoção
              

          //Colocar para alinhar por coluna
          return (
            <div key={i}>
            <div className="fields">
            Id 
            Nome
            CPF
            Data de nascimento
            Telefone
            E-mail
            Endereço
            Observação
            Operações
            </div>

            <div className="customersList" >

            <div className="id" >
            {item[1]}
            </div>
            <div className="name">
            {item[2]}
            </div>
            <div className="cpf">
            {item[3]}
            </div>
            <div className="birthdate">
            {item[4]}
            </div>
            <div className="phone">
            {item[5]}
            </div>
            <div className="email">
            {item[6]}
            </div>
            <div className="address">
            {item[7]}
            </div>
            <div className="obs">
            {item[8]}
            </div>

            <div className="operations">
            <button onClick={
              () => {
                $.ajax({
                  type: "POST",
                  url: "http://localhost/newmConexao/delete.php",
                  data: {id: item[1]},

                  success: function(response){ // sucesso de retorno executar função
                    alert("Cliente deletado com sucesso!");
                    window.location.href="/";
                  }
                });
              }
            }>Deletar</button>

            <Link to="/add"> <button>Adicionar</button> </Link>
            </div>

            </div>
            </div>
            )
          })
        }



        </>
        )
        }

        else{
          return (<><p>Nada encontrado!</p></>)
        }
      }
    }