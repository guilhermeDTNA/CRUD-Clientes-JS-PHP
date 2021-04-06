import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

import './styles.css';

//Classe que exibe todas as informaçõe sobre os clientes
export default class Customer extends Component{

  constructor(props){
    super(props);
  }

  render(){
    //Rece o número de clientes encontrados do componente ListCustomers
    let rows = this.props.rows;

    console.log(rows);

    if(rows.length !== 0){
      //Se houver algum cliente as informaçõa a seguir serão exibidas
      return(
        <>
        <p className="nameFields">Clientes:</p>
        <div className="fields">

        <div className="field">Id</div> 
        <div className="field">Nome</div>
        <div className="field">CPF</div>
        <div className="field">Data de nascimento</div>
        <div className="field">Telefone</div>
        <div className="field">E-mail</div>
        <div className="field">Endereço</div>
        <div className="field">Observação</div>
        <div className="field">Operações</div>

        </div>
        {rows = rows.map(function(item, i){

          item = item.split('{')+'';
          item = item.split('}')+'';

          //Separando informações das colunas presentes no array
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

          //Retorna para o visitante todas as informações sobre os clientes
          return (

          <div key={i}>

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
          <Link to={`/editar/${item[1]}`}> <button>Editar</button> </Link>
          <button onClick={
            () => {
              $.ajax({
                type: "POST",
                url: "http://localhost/requests/delete.php",
                data: {id: item[1]},

                success: function(response){ // sucesso de retorno executar função
                  alert("Cliente deletado com sucesso!");
                  window.location.href="/";
                }
              });
            }
          }>Deletar</button>
          </div>

          </div>
          </div>
          )
        })
      }

      </>
      )
    }
    //Caso não encontre cliente algum
    else{
      return (<><p>Nada encontrado!</p></>)
    }
  }
}