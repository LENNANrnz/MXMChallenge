import * as si from 'systeminformation';
import { getUniqueProcesses } from './GetProcesses';

async function PegarDadosDosProcessos(): Promise<any[]> {
	try {
		const uniqueProcesses = await getUniqueProcesses();

		return si.processes().then((data) => {
			const processList = data.list;

			const processMap: {
				[key: string]: { started: any; cpu: number; ram: number };
			} = {};

			processList.forEach((item) => {
				if (uniqueProcesses.includes(item.name)) {
					if (!processMap[item.name]) {
						processMap[item.name] = {
							cpu: 0,
							ram: 0,
							started: item.started,
						};
					}

					processMap[item.name].cpu += item.cpu;
					processMap[item.name].ram += item.mem;
				}
			});

			const uniqueFilteredList = Object.keys(processMap).map((name) => {
				const started = processMap[name].started.substring(11); 

				return {
					name: name,
					cpu: `${(processMap[name].cpu*10).toFixed(2)}%`,
					ram: `${processMap[name].ram.toFixed(2)}%`,
					started: started,
				};
			});
			
			return uniqueFilteredList;
		});
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function GetFilteredProcessList(): Promise<any> {
	try {
		const filteredList = await PegarDadosDosProcessos();
		return filteredList;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

export { GetFilteredProcessList };
