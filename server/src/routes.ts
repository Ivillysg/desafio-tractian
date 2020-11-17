import { Router } from 'express';
import CompanyController from './app/controllers/CompanyController';
import UnitController from './app/controllers/UnitController';
import UserController from './app/controllers/UserController';

const routes = Router();

//Users
routes.get('/users', UserController.index);
routes.post('/user', UserController.store);

//Company
routes.get('/companys', CompanyController.index);
routes.post('/company', CompanyController.store);

//Units
routes.get('/units', UnitController.index);
routes.post('/company/:id/unit', UnitController.store);

//Active
routes.get('/actives', (req, res) => res.send('actives list'));
routes.post('/unit/:id/active', (req, res) => res.send('actives list'));

export default routes;
