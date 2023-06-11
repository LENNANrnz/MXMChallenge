import { Ram } from '../Components/ramComponent/ramComponent';
import { CPU } from '../Components/cpuComponent/cpuComponent';

export const prepareData = (Memoriasram: Ram[], cpusss: CPU[]): any[] => {
	const seriesRAM: { x: Date; y: number }[] = [];
	const seriesCPU: { x: Date; y: number }[] = [];

	Memoriasram.forEach((memoria) => {
		const date = new Date(Number(memoria.time));
		date.setHours(date.getHours() - 3);
		const itemRAM = {
			x: date,
			y: Number(memoria.Ram),
		};
		seriesRAM.push(itemRAM);
	});

	cpusss.forEach((cpumemoria) => {
		const date = new Date(Number(cpumemoria.time));
		date.setHours(date.getHours() - 3);
		const itemcpu = {
			x: date,
			y: Number(cpumemoria.cpu),
		};
		seriesCPU.push(itemcpu);
	});

	const data = [
		{
			name: 'RAM',
			data: seriesRAM,
		},
		{
			name: 'CPU',
			data: seriesCPU,
		},
	];

	return data;
};
