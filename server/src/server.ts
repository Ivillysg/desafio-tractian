import { app } from './app';

const server = app;

const port = process.env.PORT || 3333;
server.listen(port, () =>
  console.log(`Servidor rodando em http://localhost:${port}`),
);
