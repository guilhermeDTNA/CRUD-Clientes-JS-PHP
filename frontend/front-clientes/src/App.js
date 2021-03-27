import React, {Component} from 'react';
import $ from 'jquery';
import { DataGrid } from '@material-ui/data-grid';

export default class App extends Component {

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

        

        //var cell = this.state.customers[i][j].split(":");
        
        //Adiciona em data o valor da célula
        //data.push(cell[1]);

      }
    }
    

    //Calcula número de linhas da tabela
    //var rows = 0;
    
    state.rows = rows;
    //state.data = data;

    this.setState(state);
  }


  render(){

    return (
      <div>


      <Customer customers={this.state.customers} rows={this.state.rows} />

      </div>
      );
  }
}

class Customer extends Component{

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

        if(this.props.rows.length >0){
          return(
            <>

            {this.props.rows.map(function(item, i){
              
              var custom = item.split('{')+'';
              custom = custom.split('}')+'';
              custom = custom.split(':')+'';
              custom = custom.split(',');

              //O i é o id de cada objeto, é o que será enviado quando tiver requisições de edição ou remoção
              
          //custom = custom.split(' ');
          
          //Colocar para alinhar por coluna
          return (

            <div key={i}>
            <div className="id">{custom[1]}</div>
            <div className="id">{custom[2]}</div>
            <div className="id">{custom[3]}</div>
            <div className="id">{custom[4]}</div>
            <div className="id">{custom[5]}</div>
            <div className="id">{custom[6]}</div>
            <div className="id">{custom[7]}</div>
            <div className="id">{custom[8]}</div>
            <div className="id">{custom[9]}</div>
            <div className="id">{custom[10]}</div>
            <div className="id">{custom[11]}</div>
            <div className="id">{custom[12]}</div>
            <div className="id">{custom[13]}</div>
            <div className="id">{custom[14]}</div>
            </div>

            )
        })
          }



          </>
          )
        }

        else{
          return (<><p>Nothing found!</p></>)
        }
      }
    }

