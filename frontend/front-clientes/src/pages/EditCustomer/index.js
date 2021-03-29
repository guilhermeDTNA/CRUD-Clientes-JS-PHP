import react, {Component} from 'react';
import $ from 'jquery';

import InputMask from 'react-input-mask';

export default class EditCustomer extends Component{

	constructor(props) {
		super(props);
		this.state = {
			id: this.props.match.params.id,
			name: '',
			cpf: '',
			birthdate: '',
			phone: '',
			email: '',
			address: '',
			obs: '',
			customer: ''
		};

		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeCPF = this.handleChangeCPF.bind(this);
		this.handleChangeBirthdate = this.handleChangeBirthdate.bind(this);
		this.handleChangePhone = this.handleChangePhone.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeAddress = this.handleChangeAddress.bind(this);
		this.handleChangeObs = this.handleChangeObs.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.validadeCPF = this.validadeCPF.bind(this);

		this.updateCustomer = this.updateCustomer.bind(this);
		this.splitCustomer = this.splitCustomer.bind(this);
	}

	componentDidMount(){
		fetch('http://localhost/newmConexao/search.php?id='+this.state.id)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					customer: result
				});
			},

			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			},
			)
		.then(
			this.splitCustomer
		)
	}
	
	handleChangeName(event){
		this.setState({name: event.target.value});
	}

	handleChangeCPF(event){
		this.setState({cpf: event.target.value});
	}

	handleChangeBirthdate(event){
		this.setState({birthdate: event.target.value});
	}

	handleChangePhone(event){		
		this.setState({phone: event.target.value});
	}

	handleChangeEmail(event){
		this.setState({email: event.target.value});
	}

	handleChangeAddress(event){
		this.setState({address: event.target.value});
	}

	handleChangeObs(event){
		this.setState({obs: event.target.value});
	}

	validadeCPF(){

		let cpf = this.state.cpf;

		var numbers, digits, sum, i, result, equal_digits;
		equal_digits = 1;
		if (cpf.length < 11)
			return false;
		for (i = 0; i < cpf.length - 1; i++)
			if (cpf.charAt(i) != cpf.charAt(i + 1))
			{
				equal_digits = 0;
				break;
			}
			if (!equal_digits)
			{
				numbers = cpf.substring(0,9);
				digits = cpf.substring(9);
				sum = 0;
				for (i = 10; i > 1; i--)
					sum += numbers.charAt(10 - i) * i;
				result = sum % 11 < 2 ? 0 : 11 - sum % 11;
				if (result != digits.charAt(0))
					return false; //Inválido
				numbers = cpf.substring(0,10);
				sum = 0;
				for (i = 11; i > 1; i--)
					sum += numbers.charAt(11 - i) * i;
				result = sum % 11 < 2 ? 0 : 11 - sum % 11;
				if (result != digits.charAt(1))
					return false; //Inválido
				return true;
			}
			else
				return false; //Inválido
			
		}

	//Função que vai verificar se os campos estão preenchidos e chama o método que fará a inserção se estiverem
	handleSubmit(event) {
		let state = this.state;

		//Antes de enviar para o servidor, verifica se algum campo está vazio ou se o CPF é inválido
		if (state.name === '' || state.cpf === ''|| state.birthdate === ''|| state.phone === ''|| state.email === ''|| state.address=== '') {
			alert("Um ou mais campos vazios");
		} else if (!this.validadeCPF()){
			alert('CPF inválido!');
		} else{
			this.updateCustomer();
		}

		
		event.preventDefault();
	}

	//Função que busca o cliente e exibe suas informações no form
	splitCustomer(){
		let state = this.state;
		let customer = JSON.stringify(state.customer);
		
		customer = customer.replace(/['"]+/g, '')
		customer = customer.split('{')+'';
        customer = customer.split('}')+'';

        customer = customer.split('id:')+'';
        customer = customer.split('name:')+'';
        customer = customer.split('cpf:')+'';
        customer = customer.split('birthdate:')+'';
        customer = customer.split('phone:')+'';
        customer = customer.split('email:')+'';
        customer = customer.split('address:')+'';
        customer = customer.split('obs:')+'';

        customer = customer.split(',');

        this.setState({
        	name: customer[4],
        	cpf: customer[6],
        	birthdate: customer[8],
        	phone: customer[10],
        	email: customer[12],
        	address: customer[14],
        	
        });
        console.log(customer[16]);
	}

	updateCustomer(){
		let state = this.state;
		$.ajax({
			type: "POST",
			url: "http://localhost/newmConexao/edit.php",
			data: {
				nome: state.name,
				cpf: state.cpf,
				nascimento: state.birthdate,
				celular: state.phone,
				email: state.email,
				endereco: state.address,
				observacao: state.obs
			},
            success: function(response){ // sucesso de retorno executar função
            	alert("Cliente atualizado com sucesso!");
            	window.location.href="/";
            }
        });

	}

	render(){
		return(
			<div className="addPage">
			<div className="form">

			<table border="2px">

			<tr>
			<td>
			Nome: <input required className="required" pattern="[a-zA-Z]+" type="text" value={this.state.name} onChange={this.handleChangeName} />
			</td>
			<td>
			CPF: <input required type="number" pattern=".{11,}" value={this.state.cpf} onChange={this.handleChangeCPF} />
			</td>
			</tr>

			<tr>
			<td>

			Data de nascimento: <input required type="date" value={this.state.birthdate} onChange={this.handleChangeBirthdate} className="birthdate" />
			</td>
			<td>
			Celular: 
			<InputMask required pattern=".{9, }.[0-9]+" alwaysShowMask value={this.state.phone} onChange={this.handleChangePhone} className="phone" mask="(99) 9 99999999" placeholder="(99) 9 99999999"/>

			
			</td>
			</tr>

			<tr>
			<td>
			E-mail: <input required type="email" value={this.state.email} onChange={this.handleChangeEmail} />
			</td>
			<td>
			Endereço: <input required type="text" value={this.state.address} onChange={this.handleChangeAddress} />
			</td>
			</tr>

			<tr>
			<td colSpan="2">
			Observação: <textarea maxLength="300" value={this.state.obs} onChange={this.handleChangeObs} />
			</td>

			</tr>
			</table>

			
			<button onClick={this.handleSubmit}> Atualizar </button>

			</div>
			</div>
			)
	}
}