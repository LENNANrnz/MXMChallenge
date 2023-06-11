import React, { useState } from 'react';
import Grafico from '../GraficoComponent/Grafico';
import Painel from '../PainelComponent/Painel';
import styles from './carrousel.module.css';

const Carousel = () => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const [renderedComponents, setRenderedComponents] = useState([true, false]); 

	const handleClickNext = () => {
		setCurrentIndex((prevIndex) => (prevIndex + 1) % renderedComponents.length);
	};

	const handleClickPrevious = () => {
		setCurrentIndex((prevIndex) => {
			if (prevIndex === 0) {
				return renderedComponents.length - 1;
			} else {
				return prevIndex - 1;
			}
		});
	};

	const toggleComponentVisibility = (index: number) => {
		const updatedComponents = [...renderedComponents];
		updatedComponents[index] = !updatedComponents[index];
		setRenderedComponents(updatedComponents);
	};

	return (
		<div className='carousel'>
			<button onClick={handleClickPrevious}>Anterior</button>
			{renderedComponents[0] && <Painel />}
			{renderedComponents[1] && <Grafico />}
			<button onClick={handleClickNext}>Próximo</button>
			<button onClick={() => toggleComponentVisibility(0)}>
				Mostrar/Esconder ComponenteA
			</button>
			<button onClick={() => toggleComponentVisibility(1)}>
				Mostrar/Esconder ComponenteB
			</button>
		</div>
	);
};

export default Carousel;
