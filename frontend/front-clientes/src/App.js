import React, {Component} from 'react';

import Routes from './routes';
import './App.css';

//Componente inicial que carrega as rotas do sistema
export default class App extends Component {

  render(){
    return(
      <Routes />
      );
  }
}

