import React, {Component} from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';

import './styles.css';

//Classe que exibe todas as informaçõe sobre os clientes
export default class Customer extends Component{

  constructor(props){
    super(props);
    this.state={
      rows: [],
      customers: [],
      data: '',
      isSearched: false
    }

    this.handleChangeData = this.handleChangeData.bind(this);
    this.searchCustomer = this.searchCustomer.bind(this);
    this.showCustomers = this.showCustomers.bind(this);
  }

  componentDidMount(){
    this.setState({rows: this.props.rows});
  }

  handleChangeData(event){    
    this.setState({data: event.target.value.replace(/([^A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.'@])/g, '')});
  }

  searchCustomer(){
    fetch(`http://localhost/requests/searchNameEmail.php?data=${this.state.data}`)
    .then(res => res.json())
    //Vai armazenar todos os clientes em result
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          customers: result
        });
        
      },

      (error) => {
        this.setState({
          //isLoaded: true,
          error
        });
      },
      )
    .then(this.setState({isSearched: true}))
    .then(this.showCustomers)
  }


  showCustomers(){

    var rows = [];
    //Armazena cada linha
    var row = '{';

    let state = this.state;

    //Se existir algum cliente, será percorrido todo o state customers e inseridos no array rows
    //As chaves são inseridas para serem reconhecidos como objeto JSON
    if(state.customers !== null){
      if(state.customers.length>1){
        for (var i=0; i<this.state.customers.length; i++){
          for(var j=0; j<this.state.customers[i].length; j++){

        //Se ainda não chegou no último elemento da linha
        if (j!==this.state.customers[i].length-1){
          row = row+''+this.state.customers[i][j];
        } else{
          row = row+''+this.state.customers[i][j]; 
          rows.push(row+'},');
          //Limpa a linha a cada mudança de linha
          row = '{';
        }
      }        
    }
    state.rows = rows;

  } else{
    this.setState({
      rows: []
    });

    var jsonCustomer = JSON.stringify(state.customers);

    rows.push(jsonCustomer);

    state.rows = rows;

    
  }
}

this.setState(state);
}

render(){
    //Rece o número de clientes encontrados do componente ListCustomers
    let rows = [];
    let isSearched = this.state.isSearched;

    /*Caso o visitante tenha pressionado o botão de pesquisar, o rows vai pegar os dados encontrados pela pesquisa
    Caso não tenha pesquisado, o rows armazenará todos os clientes*/
    if(!this.state.isSearched){
      rows = this.props.rows;
    } else rows = this.state.rows; 

    //Se for object, significa que existem mais de 1 registro
    if(rows.length > 0 && typeof(rows)==='object'){
      //Se houver algum cliente as informaçõa a seguir serão exibidas
      return(
        <>
        <p className="nameFields">Clientes:</p>
        <p className="fieldSearch"><input value={this.state.data} onChange={this.handleChangeData} type="text" placeholder="Digite o nome ou e-mail" /><button onClick={this.searchCustomer}>Pesquisar</button></p>
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

          //Se existir mais de 1 cliente e algo for pesquisado ou >=1 e nada for pesquisado
          if((rows.length>=1 && !isSearched) || (rows.length>1 && isSearched)){

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

          //Para que não exiba a palavra null na tela se o campo estiver vazio
          if(item[8] === 'null'){
            item[8] = '';
          }

        } else{ //Caso a pesquisa retorne somente 1 cliente

          let itemTemp = item;

          //A variável vai fazer a divisão da string (porque quando a pesquisa só retorna 1, ela vem como string)
          itemTemp = itemTemp.replace(/['"]+/g, '');
          
          itemTemp = itemTemp.split('{')+'';
          itemTemp = itemTemp.split('}')+'';
          
          itemTemp = itemTemp.split("id:")+'';
          itemTemp = itemTemp.split("name:")+'';
          itemTemp = itemTemp.split("cpf:")+'';
          itemTemp = itemTemp.split("birthdate:")+'';
          itemTemp = itemTemp.split("phone:")+'';
          itemTemp = itemTemp.split("email:")+'';
          itemTemp = itemTemp.split("address:")+'';
          itemTemp = itemTemp.split("obs:")+'';

          itemTemp = itemTemp.split(',');

          item = [];
          item[1] = itemTemp[2];
          item[2] = itemTemp[4];
          item[3] = itemTemp[6];
          item[4] = itemTemp[8];
          item[5] = itemTemp[10];
          item[6] = itemTemp[12];
          item[7] = itemTemp[14];
          item[8] = itemTemp[16];

          //Para que não exiba a palavra null na tela se o campo estiver vazio
          if(item[8] === 'null'){
            item[8] = '';
          }
        }

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