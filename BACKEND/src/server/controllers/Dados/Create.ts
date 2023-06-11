import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { validation } from '../../shared/middleware';


interface IBodyProps {

	nome: string;
	email: string;
	senha:string;
}

export const createValidation = validation((getSchema) => ({
	body: getSchema<IBodyProps>(
		yup.object().shape({
			nome: yup.string().required().min(3),
			email: yup.string().email().required(),
			senha: yup.string().min(5).required(),
		})
	),
}));

export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
	
	return res.send('ola de uma avaliação pro projeto heheboy');
};
