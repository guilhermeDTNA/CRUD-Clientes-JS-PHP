import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//Importa todos os componentes que serão exibidos
import ListCustomers from './pages/ListCustomers';
import Customer from './pages/Customer';
import AddCustomer from './pages/AddCustomer/';

import Mistake from './pages/Mistake';

//<Route path="/" component = {PageHeader} />

//Componente que define quais as rotas e seus respectivos componentes a aplicação possui
export default class Routes extends Component {

	render(){
		//O que está fora de Switch será exibido em todas as páginas, no caso, o cabeçalho
		return(
			<BrowserRouter>

			

			<Switch>

			<Route exact path="/" component={ListCustomers} />
			<Route exact path="/add" component={AddCustomer} />


			<Route path="*" component = {Mistake} />
			</Switch>

			</BrowserRouter>
		);
	}

}