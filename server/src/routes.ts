import { Router } from 'express';
import ActiveController from './app/controllers/ActiveController';
import CompanyController from './app/controllers/CompanyController';
import UnitController from './app/controllers/UnitController';
import UserController from './app/controllers/UserController';

const routes = Router();

routes.get('/', (req, res) => res.json('Desafio FullStack Tractian'));

//Users
routes.get('/user', UserController.index);
routes.post('/user', UserController.store);
routes.get('/user/:id', UserController.show);
routes.get('/usermail/:email', UserController.findUser);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id', UserController.delete);

//Company
routes.get('/company', CompanyController.index);
routes.post('/company/:id', CompanyController.store);
routes.get('/company/:id', CompanyController.show);
routes.put('/company/:id', CompanyController.update);
routes.delete('/company/:id', CompanyController.delete);

//Units
routes.get('/unit', UnitController.index);
routes.post('/unit/:id', UnitController.store);
routes.get('/unit/:id', UnitController.show);
routes.put('/unit/:id', UnitController.update);
routes.delete('/unit/:id', UnitController.delete);

//Active
routes.get('/active', ActiveController.index);
routes.post('/active/:id', ActiveController.store);
routes.get('/active/:id', ActiveController.show);
routes.put('/active/:id', ActiveController.update);
routes.delete('/active/:id', ActiveController.delete);

export default routes;
