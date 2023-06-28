import express, { Express, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import 'dotenv/config';
import 'reflect-metadata';

import * as middlewares from './middlewares';
import MessageResponse from './interfaces/MessageREsponse';
import api from './api';

const app:Express = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

app.get<{}, MessageResponse>('/', (req: Request, res: Response) => {
  res.json({
    message: '🧁 Blog Backend Api 🧁',
  });
});

app.use('/api/v1', api);

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

export default app;