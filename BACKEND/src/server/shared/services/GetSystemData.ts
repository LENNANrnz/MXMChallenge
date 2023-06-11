import si from 'systeminformation';
import { date } from 'yup';
export const GetSystemData = async () => {
	const systemData = {
		RAMtotal: '',
		RAMusada: '',
		RAMPorcentagem: '',
		cargacpuporcentagem: '',
		marcacpu: '',
		qtdeprocessos: '',
		horaeminuto: ''
	};

	try {
		const memData = await si.mem();
		systemData.RAMtotal = (memData.total / 1024 / 1024).toFixed(0);
		systemData.RAMusada = (memData.used / 1024 / 1024).toFixed(0);

		const porcentagem = (
			(parseInt(systemData.RAMusada) / parseInt(systemData.RAMtotal)) *
			100
		).toFixed(2);

		systemData.RAMPorcentagem = porcentagem.toString();

		const hora = new Date();
		const tempoatual = (hora.getTime()).toString();

		systemData.horaeminuto = tempoatual;

		const cpuData = await si.cpu();
		systemData.marcacpu = cpuData.brand;

		const cpuusage = await si.currentLoad();
		systemData.cargacpuporcentagem = cpuusage.currentLoad.toFixed(2);

		const processData = await si.processes();
		systemData.qtdeprocessos = processData.all.toString();

		return systemData;
	} catch (error) {
		console.error(error);
		throw error;
	}
};
