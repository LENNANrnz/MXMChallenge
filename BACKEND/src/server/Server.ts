import './shared/services/translateYup';
import express from 'express';
import cors from 'cors';
import { router } from './routes';
import 'dotenv/config';

const server = express();

server.use(express.json());
server.use(cors());

server.use(router);

export { server };
