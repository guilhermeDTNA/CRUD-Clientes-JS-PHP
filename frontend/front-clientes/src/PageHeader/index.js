import React from 'react';
import {Link} from 'react-router-dom';

import './index.css';

//Componente que exibe o cabeçalho
export default function PageHeader(){
	return(

			<div className="headerContainer">
				<p>
				<Link to="/"><button>Página Inicial</button></Link>
				
				<Link to="/cadastrar"> <button>Adicionar</button> </Link>
				</p>
			</div>


		);
	}