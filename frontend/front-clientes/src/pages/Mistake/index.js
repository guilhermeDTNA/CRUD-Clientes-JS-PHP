import React from 'react';

import './index.css';
import mistake_img from '../img/mistake-img.jpg';

/*Componente que exibe página 404*/
export default function Mistake(){
	return(

		<div>
		<div className="title-mistake">

		<p>Ops... página não encontrada!</p>

		</div>

		<div className="image-mistake">
		<img src={mistake_img} />
		</div>

		</div>

		);
	}