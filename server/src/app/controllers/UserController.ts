import { Request, Response } from 'express';
import User from '../models/user';
import CRUD from '../protocols/CRUD';
import * as Yup from 'yup';

class UserController {
  async store(req: Request, res: Response) {
    const { email } = req.body;
    const data = { email };

    const schema = Yup.object().shape({
      email: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const user = await CRUD.create(User, data);

    return res.status(201).json(user);
  }

  async index(req: Request, res: Response) {
    const Users = await CRUD.readAll(User).populate('companys');
    return res.status(200).send(Users);
  }
}

export default new UserController();
