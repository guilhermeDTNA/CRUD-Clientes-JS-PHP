import React, {Component} from 'react';

import Customer from './Customer';
import Loading from '../Loading';

//Componente que envia requisição para o servidor e envia as informações sobre os cliente para Customer.js
export default class ListCustomers extends Component {

  constructor(props){
    super(props);
    this.state={
      customers:[],
      rows: [],
      isLoaded: false,
      error: ''
    }
    
    this.showCustomers = this.showCustomers.bind(this);
  }

  componentDidMount(){

    fetch('http://localhost/newmConexao/list.php')
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
          isLoaded: true,
          error
        });
      },
      )
    //showCustomers é executada logo ao carregar o componente
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
  }

  state.rows = rows;

  this.setState(state);
}


render(){

  let state = this.state;

    //Exibe o erro (se houver) ao carregar o componente
    if (state.error) {
      return <div>Erro: {state.error.message}</div>;
    } else if (!state.isLoaded) {
      return <div> <p>{Loading}</p></div>;
    } else {

      return (
      <div>
      
      <Customer rows={this.state.rows} />

      </div>
      );
    }
  }
}

