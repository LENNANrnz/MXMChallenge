import axios from 'axios';
import { Ram } from '../Components/ramComponent/ramComponent';
import { CPU } from '../Components/cpuComponent/cpuComponent';

export const fetchDataAndUpdateChart = (
	setDadosGrafico: React.Dispatch<React.SetStateAction<any>>
) => {
	axios
		.get('http://localhost:3333/dadosdosistema')
		.then((response) => {
			const { RAMPorcentagem, horaeminuto } = response.data;
			const ramMemory = new Ram(RAMPorcentagem, horaeminuto);
			ramMemory.SetMemoriaRam(RAMPorcentagem, horaeminuto);

			const { cargacpuporcentagem } = response.data;
			const CpuMemory = new CPU(cargacpuporcentagem, horaeminuto);
			CpuMemory.Setcpu(cargacpuporcentagem, horaeminuto);

			setDadosGrafico(response.data);
		})
		.catch((error) => {
			console.error('Error fetching data:', error);
		});
};
