import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import { DadosController } from '../controllers/Dados';
import { SistemaController } from '../controllers/Sistema';

const router = Router();

//usuario

 router.get('/dados', DadosController.GetAll);

 router.get('/dadosdosistema', SistemaController.GetAll );

// router.post('/user',UsuarioController.createValidation, UsuarioController.create);

export { router };
