import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { GetSystemData } from '../../shared/services/GetSystemData';

export const GetAll = async (_req: Request, res: Response) => {
	try {
		const jsonData = await GetSystemData();
		res.status(StatusCodes.OK).json(jsonData); 
	} catch (error) {
		console.error(error);
		res
			.status(StatusCodes.INTERNAL_SERVER_ERROR)
			.json({ error: 'Ocorreu um erro no servidor.' });
	}
};
