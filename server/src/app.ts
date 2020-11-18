import express from 'express';
import 'express-async-errors';
import routes from './routes';
import erroHandler from './errors/erroHandler';
import cors from 'cors';

import dotenv from 'dotenv';
import database from './config/database';
dotenv.config();

export const app = express();
app.use(cors());
database();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);
app.use(erroHandler);
