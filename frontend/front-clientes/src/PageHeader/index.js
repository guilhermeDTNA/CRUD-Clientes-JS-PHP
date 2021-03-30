import React from 'react';
import {Link} from 'react-router-dom';

import './index.css';

//Componente que exibe o cabeçalho
export default function PageHeader(){
	return(

		<div className="headerContainer">
		
		<Link to="/"><button className="buttonHeader buttonHeaderInicial">Página Inicial</button></Link>
		
		<Link to="/cadastrar"> <button className="buttonHeader buttonHeaderAdd">Adicionar</button> </Link>
		
		</div>


		);
	}