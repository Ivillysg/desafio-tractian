import express, { Express } from 'express';
import routes from './routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

class AppController {
  server: Express;

  constructor() {
    this.server = express();

    this.database()
    this.middlewares()
    this.router()

  }


  database() {
    if (process.env.NODE_ENV !== 'test') {
      mongoose.connect(process.env.NODE_ENV === 'development' ? process.env.DEVELOPMENT : process.env.PRODUCTION,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => console.log('Conectado ao database!'))
        .catch(err => console.log(err));
    }
  }

  middlewares() {
    this.server.use(express.json())
  }

  router() {
    this.server.use(routes)
  }
}


export default new AppController().server