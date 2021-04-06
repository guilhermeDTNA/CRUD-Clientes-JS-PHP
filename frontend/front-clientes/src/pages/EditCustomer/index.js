import react, {Component} from 'react';
import $ from 'jquery';

import '../AddCustomer/styles.css';
import Loading from '../Loading';

/*Classe semelhante à AddCustomer, suas únicas diferenças estão no retorno dos dados nos campos de 
acordo com o cliente especificado e no tipo de requisição a ser feita ao backend */ 
export default class EditCustomer extends Component{

	constructor(props) {
		super(props);
		//O id acessa a props passada pelo Ajax em Customer.js
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

		this.validateCPF = this.validateCPF.bind(this);

		this.updateCustomer = this.updateCustomer.bind(this);
		this.splitCustomer = this.splitCustomer.bind(this);
	}

	//Logo ao ser iniciado, o componente consultará e exibirá as informações relacionadas ao cliente 
	componentDidMount(){
		fetch('http://localhost/requests/search.php?id='+this.state.id)
		.then(res => res.json())
		.then(
			(result) => {
				this.setState({
					isLoaded: true,
					customer: result
				});
			},
			//Exibe 
			(error) => {
				this.setState({
					isLoaded: true,
					error
				});
			},
			)
		//Chama a função splitCustomer para separar os dados recebidos
		.then(
			this.splitCustomer
			)
	}
	
	handleChangeName(event){
		this.setState({name: event.target.value.replace(/([^\sA-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ])/g, '')});
	}

	handleChangeCPF(event){
		this.setState({cpf: event.target.value});
	}

	handleChangeBirthdate(event){
		this.setState({birthdate: event.target.value});
	}

	handleChangePhone(event){		
		this.setState({phone: event.target.value.replace(/([^0-9])/g, '')});
	}

	handleChangeEmail(event){
		this.setState({email: event.target.value.replace(/([^A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.'@])/g, '')});
	}

	handleChangeAddress(event){
		this.setState({address: event.target.value.replace(/([^\sA-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.'])/g, '')});
	}

	handleChangeObs(event){
		this.setState({obs: event.target.value.replace(/([^\sA-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.'])/g, '')});
	}

	validateCPF(){

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

	handleSubmit(event) {
		let state = this.state;

		if (state.name === '' || state.cpf === ''|| state.birthdate === ''|| state.phone === ''|| state.email === ''|| state.address=== '') {
			alert("Um ou mais campos vazios");
		} else if (!this.validateCPF()){
			alert('CPF inválido!');
		} else if(this.state.email.indexOf("@") === -1){
			alert("E-mail inválido");
		} else{
			this.updateCustomer();
		}

		
		event.preventDefault();
	}

	//Função que divide o JSON cliente armazenado em customer e altera os states relacionados aos dados
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

		//As posições pares >2 se referem aos dados relacionados a nome, cpf, data de nascimento, ...
		this.setState({
			name: customer[4],
			cpf: customer[6],
			birthdate: customer[8],
			phone: customer[10],
			email: customer[12],
			address: customer[14],
			obs: customer[16]
		});
	}

	//Método que enviar requisição ao servidor para atualizar o cliente
	updateCustomer(){
		let state = this.state;
		$.ajax({
			type: "POST",
			url: "http://localhost/requests/edit.php",
			data: {
				id: this.state.id,
				nome: this.state.name,
				cpf: this.state.cpf,
				nascimento: this.state.birthdate,
				celular: this.state.phone,
				email: this.state.email,
				endereco: this.state.address,
				observacao: this.state.obs
			},
            success: function(response){ // sucesso de retorno executar função
            	alert("Cliente atualizado com sucesso!");
            	//Leva à página inicial
            	window.location.href="/";
            }
        });

	}

	render(){

		let state = this.state;

    //Exibe o erro (se houver) ao carregar o componente
    if (state.error) {
    	return <div>Erro: {state.error.message}</div>;
    } //Exibe o componente de Loading enquanto o conteúdo não é totalmente carregado 
    else if (!state.isLoaded) {
    	return <div> <p>{Loading}</p></div>;
    } else {

    	return(
    		<div className="addPage">
    		<p className="namePage">Editar cliente:</p>
    		<div className="form">

    		<div className="row">

    		<div>
    		<label>Nome:</label> <input required type="text" value={this.state.name} onChange={this.handleChangeName} />
    		</div>

    		<div>
    		<label>CPF:</label> <input required type="number" value={this.state.cpf} onChange={this.handleChangeCPF} />
    		</div>

    		</div>

    		<div className="row">

    		<div>
    		<label>Data de nascimento:</label> <input required type="date" value={this.state.birthdate} onChange={this.handleChangeBirthdate} className="birthdate" />
    		</div>

    		<div>
    		<label>Celular:</label> <input required value={this.state.phone} onChange={this.handleChangePhone} className="phone" placeholder="(99) 9 99999999"/>
    		</div>

    		</div>

    		<div className="row">

    		<div>
    		<label>E-mail: </label><input required type="email" value={this.state.email} onChange={this.handleChangeEmail} />
    		</div>

    		<div>
    		<label>Endereço: </label><input required type="text" value={this.state.address} onChange={this.handleChangeAddress} />
    		</div>

    		</div>

    		<div className="row">
    		<div>
    		<label>Observação:</label> <textarea maxLength="300" value={this.state.obs} onChange={this.handleChangeObs} />
    		</div>

    		</div>

    		</div>

    		<p className="button">
    		<button onClick={() => window.location.href="/"}> Cancelar </button>
    		<button onClick={this.handleSubmit}> Atualizar </button>

    		</p>

    		</div>
    		)
    	}
	}
}