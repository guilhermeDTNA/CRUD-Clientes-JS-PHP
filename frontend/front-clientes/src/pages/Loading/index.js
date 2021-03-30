import React from 'react';

import loadImage from '../img/loading.gif';
import './index.css';

//Componente que exibe imagem de loading ao carregar as páginas
export default function Loading(){
	return(
		<div className="containerLoading">
		<img src={loadImage} className="imgLoading" />
		<p className="textLoading">Loading...</p>
		</div>
	);
}