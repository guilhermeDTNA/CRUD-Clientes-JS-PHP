import React, {Component} from 'react';

import Customer from './Customer';
import Loading from './Loading';

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
    .then(this.showCustomers)
  }

  showCustomers(){

    var rows = [];
    //Armazena cada linha
    var row = '{';


    let state = this.state;

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
    

    //Calcula número de linhas da tabela
    //var rows = 0;
    
    state.rows = rows;
    //state.data = data;

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

