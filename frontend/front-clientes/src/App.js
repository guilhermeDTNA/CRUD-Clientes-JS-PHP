import React, {Component} from 'react';

export default class App extends Component {

  constructor(props){
    super(props);
    this.state={
      customers:[],
      isLoaded: false,
      error: '',
      data: []
    }
    this.showCustomers = this.showCustomers.bind(this);
  }

  componentDidMount(){

    fetch('http://localhost/newmConexao/listar.php')
    .then(res => res.json())
    .then(
      (result) => {

        this.setState({
          isLoaded: true,
          customers: result
        });
      },
        // error handler
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

    var data = [];

    for (var i=0; i<this.state.customers.length; i++){
      for(var j=0; j<this.state.customers[i].length; j++){

        //console.log(this.state.customers[i][j]);
        var cell = this.state.customers[i][j].split(":");
        data.push(cell[1]);

        
      }
    }

    this.setState({
      data: data
    });

    for (var i=0; i<this.state.data.length; i++){
      console.log(this.state.data[i]);
    }
  }


  render(){
    let state = this.state;
    /*
          <h1>Lista de inspeção</h1>

      <div>
        {
          this.state.customers.map((cliente, i) => (
            <article key={cliente.id}>
              <strong>{cliente.nome}</strong>
              <p>dt_inicio: {cliente.nascimento}</p>
              <p>dt_fim: {cliente.telefone}</p>
              <p>Nome: {this.state.cliente[i].nome}</p>
            </article>
          ))
        }
      </div>
      */
      for (var i=0; i<this.state.data.length; i++){
        return (<div>{state.data[i]}</div>);
      }

      return (
        <div className="App">




        {state.customers.length}
        {state.data[1]}


        </div>
        );
    }
  }

  class Customer extends Component{

    constructor(props){
      super(props);
    }

    render(){

      console.log(this.props.customers[0]);

      return(
        <>
        <p>{this.props.customers}</p>
        </>
        )
      }
    }
