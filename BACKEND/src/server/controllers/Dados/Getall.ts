import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GetFilteredProcessList } from '../../shared/services/listAllprocesses';

export const GetAll = async (_req: any, res: Response) => {
	try {
		const dadosProcessos = await GetFilteredProcessList();
		return res.json(await dadosProcessos);
	} catch (error) {
		console.error(error);
		return res.status(500).send('Erro ao obter os dados dos processos');
	}
};
