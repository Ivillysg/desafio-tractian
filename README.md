
<p align="center">
 <h1>Desafio FullStack Tractian</h1>
</p>

## 📋 Índice
- [📋 Índice](#-índice)
- [📖 Sobre](#-sobre)
- [🖥 Preview](#-preview)
- [🚀 Tecnologias utilizadas](#-tecnologias-utilizadas)
  - [Front-End](#front-end)
  - [Back-End](#back-end)
- [⌨ Como executar o projeto](#-como-executar-o-projeto)
- [Pré-requisitos](#pré-requisitos)
  - [🎲 Rodando o Back End (servidor)](#-rodando-o-back-end-servidor)
  - [🎲 Rodando o Front End (Cliente)](#-rodando-o-front-end-cliente)

---
## 📖 Sobre
O objetivo do desafio foi desenvolver uma pequena aplicação utilizando Node.js/React.js.

Link para testar o projeto: https://ivillysg.github.io/desafio/

---

## 🖥 Preview

<p align="center">
 <img src="https://imgur.com/m6TIljE.png" width="700" >
</p>

---
## 🚀 Tecnologias utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

### Front-End

 - [React](https://reactjs.org/)
 - [Typescript](https://www.typescriptlang.org/)
 - [Axios](https://github.com/axios/axios)
 - [React-Router-Dom](https://reactrouter.com/web/guides/quick-start)
 - [Redux](https://redux.js.org/)
 - [React-Redux-Toastr](https://github.com/diegoddox/react-redux-toastr)
 - [React-Hook-Form](https://react-hook-form.com/)
 -

### Back-End

 - [NodeJS](https://nodejs.org/en/)
 - [Express](https://expressjs.com/pt-br/)
 - [Typescript](https://classic.yarnpkg.com/)
 - [Cors](https://www.npmjs.com/package/cors)
 - [Mongoose](https://mongoosejs.com/)
 - [Jest](https://jestjs.io/)

---

## ⌨ Como executar o projeto

## Pré-requisitos

Antes de começar, certifique-se que tenha o [Node.js](https://nodejs.org/en/) instalado.
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

### 🎲 Rodando o Back End (servidor)

```bash

# Acesse a pasta do projeto no terminal/cmd
 $ cd desafio-tractian

# Vá para a pasta server
$ cd server

# Instale as dependências
$ npm install # Execute a aplicação em modo de desenvolvimento
# ou
$ yarn

# O servidor iniciara na porta:333 - acesse http://localhost:3333/
$ npm run dev:server

```


### 🎲 Rodando o Front End (Cliente)
```bash
 # Vá para a pasta web
$ cd web

# Instale as dependências
$ npm install # Execute a aplicação em modo de desenvolvimento
# ou
$ yarn

#Antes de iniciar o cliente, crie um arquivo .env com a seguinte variável
REACT_APP_API_URL = http://localhost:8080 #url da api.

# O servidor iniciara na porta:3000 - acesse http://localhost:3000
$ yarn
# ou
$ npm run start




```

