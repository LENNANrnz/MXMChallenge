interface Cpuusage {
	cpu: string;
	time: string;
}

export class CPU implements Cpuusage {
	cpu: string;
	time: string;

	constructor(ram: string, time: string) {
		this.cpu = ram;
		this.time = time;
	}

	Setcpu(porcentagem: string, ticksrelogio: string): void {
		const cpuusage: Cpuusage = {
			cpu: porcentagem,
			time: ticksrelogio,
		};

		const Memoriascpu: Cpuusage[] = JSON.parse(
			localStorage.getItem('CpuUsage') || '[]'
		);

		if (Memoriascpu.length >= 240) {
			Memoriascpu.shift(); 
		}

		Memoriascpu.push(cpuusage); 

		localStorage.setItem('CpuUsage', JSON.stringify(Memoriascpu));
	}
}
