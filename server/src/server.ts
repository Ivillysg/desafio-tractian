import app from './app';
import dotenv from 'dotenv';
dotenv.config();

const server = app;

const port = process.env.PORT || 3333;

server.listen(port,()=>console.log(`Servidor sendo executado na porta: ${port}`))