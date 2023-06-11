import { exec, ExecException } from 'child_process';

const command = 'tasklist /v | findstr /i "console" | findstr /i /v "services" | findstr /i /v "N/A" ';

async function getUniqueProcesses(): Promise<string[]> {
  return new Promise<string[]>((resolve, reject) => {
    exec(command, (error: ExecException | null, stdout: string) => {
      if (error) {
        console.error(`Erro ao executar o comando: ${error.message}`);
        reject(error);
        return;
      }

      const lines = stdout.split('\n');
      const processLines = lines.slice(2);
      const processes = processLines.map((line) => {
        const columns = line.trim().split(/\s+/);
        return columns[0];
      });

      const uniqueProcesses = [...new Set(processes)];
      resolve(uniqueProcesses);
    });
  });
}

export { getUniqueProcesses };






