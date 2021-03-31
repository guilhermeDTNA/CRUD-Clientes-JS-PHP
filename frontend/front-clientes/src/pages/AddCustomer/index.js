import react, {Component} from 'react';
import $ from 'jquery';

import './styles.css';

export default class AddCustomer extends Component{

	//Define os estados
	constructor(props) {
		super(props);
		this.state = {
			name: '',
			cpf: '',
			birthdate: '',
			phone: '',
			email: '',
			address: '',
			obs: ''
		};

		//Dá permissão às funções de acessarem os estados
		this.handleChangeName = this.handleChangeName.bind(this);
		this.handleChangeCPF = this.handleChangeCPF.bind(this);
		this.handleChangeBirthdate = this.handleChangeBirthdate.bind(this);
		this.handleChangePhone = this.handleChangePhone.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangeAddress = this.handleChangeAddress.bind(this);
		this.handleChangeObs = this.handleChangeObs.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);

		this.validateCPF = this.validateCPF.bind(this);

		this.add = this.add.bind(this);
	}

	//Todos os handle recebem valor do campo e alteram o estate respectivo
	handleChangeName(event){
		//O replace vai permitir somente letras para nome
		this.setState({name: event.target.value.replace(/([^\sA-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ])/g, '')});
	}

	handleChangeCPF(event){
		this.setState({cpf: event.target.value});
	}

	handleChangeBirthdate(event){
		this.setState({birthdate: event.target.value});
	}

	handleChangePhone(event){		
		//Aceitará só números
		this.setState({phone: event.target.value.replace(/([^0-9])/g, '')});
	}

	handleChangeEmail(event){
		//Aceitará números, letras, e @
		this.setState({email: event.target.value.replace(/([^A-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.'@])/g, '')});
	}

	handleChangeAddress(event){
		this.setState({address: event.target.value.replace(/([^\sA-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.'])/g, '')});
	}

	handleChangeObs(event){
		this.setState({obs: event.target.value.replace(/([^\sA-Za-z0-9áàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ.'])/g, '')});
	}

	//Função extraída da internet que verifica se um CPF é válido
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

	//Função que vai verificar se os campos estão preenchidos e se o CPF e e-mail são válidos e chama o método que fará a inserção se estiverem
	handleSubmit(event) {
		let state = this.state;

		//Antes de enviar para o servidor, verifica se algum campo está vazio ou se o CPF é inválido
		if (state.name === '' || state.cpf === ''|| state.birthdate === ''|| state.phone === ''|| state.email === ''|| state.address=== '') {
			alert("Um ou mais campos vazios");
		} else if (!this.validateCPF()){
			alert("CPF inválido!");
			//E-mail só é validade se tiver o @
		} else if(this.state.email.indexOf("@") === -1){
			alert("E-mail inválido");
		} else{
			this.add();
		}

		//Não recarrega a página
		event.preventDefault();
	}

	//Método que faz a requisição ao arquivo PHP enviando os dados via AJAX
	add(){
		let state = this.state;
		$.ajax({
			type: "POST",
			url: "http://localhost/requests/add.php",
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
            	alert("Cliente inserido com sucesso!");
            }
        });
        //Limpa todos os campos ao enviar
		this.setState({name: '', cpf: '', birthdate: '', phone: '', email: '', address: '', obs: ''});
	}

	//Renderizará as informações para o cliente em HTML
	render(){
		return(
			<div className="addPage">

			<p className="namePage">Adicionar cliente:</p>
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

			<button onClick={this.handleSubmit}> Cadastrar </button>
			</p>
			</div>
			)
	}
}