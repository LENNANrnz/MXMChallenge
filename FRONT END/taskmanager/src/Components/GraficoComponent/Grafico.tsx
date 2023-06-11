import { useEffect, useRef, useState } from 'react';
import styles from './Grafico.module.css';
import ApexCharts, { getChartByID } from 'apexcharts';
import axios from 'axios';
import { Ram } from '../ramComponent/ramComponent';
import { CPU } from '../cpuComponent/cpuComponent';
import { fetchDataAndUpdateChart } from '../../Services/Envio a localstorage';
import { prepareData } from '../../Services/pegadadosLocalStorage';
interface DadosGrafico {
	RAMtotal: string;
	RAMusada: string;
	RAMPorcentagem: string;
	cargacpuporcentagem: string;
	marcacpu: string;
	qtdeprocessos: string;
	horaeminutos: string;
}

export default function Grafico() {
	const chartRef = useRef<HTMLDivElement>(null);
	const [dadosGrafico, setDadosGrafico] = useState<DadosGrafico | null>(null);
	const Memoriasram: Ram[] = JSON.parse(localStorage.getItem('MemoriaRam') || '[]');
	const cpusss: CPU[] = JSON.parse(localStorage.getItem('CpuUsage') || '[]');
	const data = prepareData(Memoriasram, cpusss);


	useEffect(() => {
		fetchDataAndUpdateChart(setDadosGrafico);
		const interval = setInterval(() => fetchDataAndUpdateChart(setDadosGrafico),5000);
		return () => clearInterval(interval);
	}, []);

	const options = {
		chart: {
			type: 'area',
			height: '70%',
		},
		dataLabels: {
			enabled: false,
		},
		title: {
			text: 'Uso de RAM e CPU',
			align: 'center',
		},
		stroke: {
			width: [3, 3],
		},
		xaxis: {
			type: 'datetime',
			title: {
				text: 'Data de Uso',
			},
		},
		yaxis: {
			max: 100,
			tickAmount: 10,
			title: {
				text: 'Porcentagem de uso',
			},
		},
		series: data,
	};

	useEffect(() => {
		if (chartRef.current) {
			const chart = new ApexCharts(chartRef.current, options);
			chart.render();
			return () => {
				chart.destroy();
			};
		}
	}, []);

	return (
		<>
			<div className={styles.graficocomp}>
				<div className={styles.painelGrafico}>
					<div className={styles.infodados}>
						<h1 className={styles.cpumodel}>{dadosGrafico?.marcacpu}</h1>
						<ul className={styles.listaestatic}>
							<li className={styles.dados}>
								RAM Usada/Total {dadosGrafico?.RAMusada}/
								{dadosGrafico?.RAMtotal}Mb &#40;{dadosGrafico?.RAMPorcentagem}
								%&#41;
							</li>
							<li className={styles.dados}>
								Processos Totais: {dadosGrafico?.qtdeprocessos}
							</li>
							<li className={styles.dados}>
								CPU {dadosGrafico?.cargacpuporcentagem}%
							</li>
						</ul>
					</div>
					<div
						ref={chartRef}
						id={styles.graficoid}
						className={styles.graficopainel}
					/>
				</div>
			</div>
		</>
	);
}
