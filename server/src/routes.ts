import { Router } from "express";
import UserController from './app/controllers/UserController';

const routes = Router();

routes.get('/',(req,res)=>res.send('hello'))

routes.post('/user', UserController.store)





export default routes