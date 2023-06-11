import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import styles from './Painel.module.css';
import axios from 'axios';

interface Dados {
	name: string;
	status: string;
	cpu: number;
	ram: number;
	started: string;
}

export default function Painel() {
	const [tabela, setTabela] = useState<Dados[]>([]);

	useEffect(() => {
		const fetchData = () => {
			axios
				.get<Dados[]>('http://localhost:3333/dados')
				.then((response) => {
					setTabela(response.data);
				})
				.catch((error) => {
					console.log(error);
				});
		};

		fetchData();

		const interval = setInterval(() => {
			fetchData();
		}, 10000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	const [colunaOrdenada, setColunaOrdenada] = useState('');
	const [ordemAscendente, setOrdemAscendente] = useState(true);

	const ordenarTabela = (coluna: string) => {
		let novaOrdemAscendente = true;
		if (coluna === colunaOrdenada) {
			novaOrdemAscendente = !ordemAscendente;
		}
		const tabelaOrdenada = _.orderBy(
			tabela,
			[coluna],
			[novaOrdemAscendente ? 'asc' : 'desc']
		);
		setTabela(tabelaOrdenada);
		setColunaOrdenada(coluna);
		setOrdemAscendente(novaOrdemAscendente);
	};

	return (
		<div className={styles.telapainel}>
			<div className={styles.containertable}>
				<table className={styles.table}>
					<thead>
						<tr>
							<th
								className={styles.headers}
								onClick={() => ordenarTabela('name')}
							>
								Nome
							</th>
							<th
								className={styles.headers}
								onClick={() => ordenarTabela('Status')}
							>
								Status
							</th>
							<th
								className={styles.headers}
								onClick={() => ordenarTabela('cpu')}
							>
								CPU
							</th>
							<th
								className={styles.headers}
								onClick={() => ordenarTabela('ram')}
							>
								RAM
							</th>
							<th
								className={styles.headers}
								onClick={() => ordenarTabela('Inicialização')}
							>
								Inicialização
							</th>
						</tr>
					</thead>
					<tbody className={styles.dadostabela}>
						{tabela.map((item, index) => (
							<tr key={index}>
								<td>{item.name}</td>
								<td>Em execução</td>
								<td>{item.cpu}</td>
								<td>{item.ram}</td>
								<td>{item.started}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}
