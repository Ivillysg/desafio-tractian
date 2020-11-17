import express from 'express';
import 'express-async-errors';

import routes from './routes';
import erroHandler from './errors/erroHandler';
import cors from 'cors';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(erroHandler);

function database() {
  if (process.env.NODE_ENV !== 'test') {
    mongoose
      .connect(
        process.env.NODE_ENV === 'development'
          ? process.env.DEVELOPMENT
          : process.env.PRODUCTION,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      )
      .then(() => console.log('Conectado ao database!'))
      .catch(err => console.log(err));
  }
}
database();
