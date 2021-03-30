import React, {Component} from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

//Importa todos os componentes que serão exibidos
import ListCustomers from './pages/LoadCustomers/ListCustomers';
import Customer from './pages/LoadCustomers/Customer';
import AddCustomer from './pages/AddCustomer/';
import EditCustomer from './pages/EditCustomer/';

//Componentes não obrigatórios (cabeçalho e página 404)
import PageHeader from './PageHeader/';
import Mistake from './pages/Mistake';


//Componente que define quais as rotas e seus respectivos componentes a aplicação possui
export default class Routes extends Component {

	render(){
		//O que está fora de Switch será exibido em todas as páginas, no caso, o cabeçalho
		return(
			<BrowserRouter>

			<Route path="/" component = {PageHeader} />

			<Switch>

			<Route exact path="/" component={ListCustomers} />
			<Route exact path="/cadastrar" component={AddCustomer} />
			<Route exact path="/editar/:id" component={EditCustomer} />

			<Route path="*" component = {Mistake} />
			</Switch>

			</BrowserRouter>
		);
	}
}