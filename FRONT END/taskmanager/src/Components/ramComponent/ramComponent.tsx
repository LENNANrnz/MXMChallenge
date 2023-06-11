interface RamMemory {
	Ram: string;
	time: string;
}

export class Ram implements RamMemory {
	Ram: string;
	time: string;

	constructor(ram: string, time: string) {
		this.Ram = ram;
		this.time = time;
	}

	SetMemoriaRam(porcentagem: string, ticksrelogio: string): void {
		const memoriaRam: RamMemory = {
			Ram: porcentagem,
			time: ticksrelogio,
		};

		const Memoriasram: RamMemory[] = JSON.parse(
			localStorage.getItem('MemoriaRam') || '[]'
		);

		if (Memoriasram.length >= 240) {
			Memoriasram.shift(); 
		}

		Memoriasram.push(memoriaRam); 

		localStorage.setItem('MemoriaRam', JSON.stringify(Memoriasram));
	}
}
