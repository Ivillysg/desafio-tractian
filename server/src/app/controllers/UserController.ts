import { Request, Response } from 'express';
import User from '../models/user';

import CRUD from '../interface/CRUD';
import * as Yup from 'yup';

class UserController {
  async store(req: Request, res: Response) {
    const { email } = req.body;
    const data = { email };
    const isUserExists = await User.findOne({ email });

    if (isUserExists) {
      return res.status(409).json({ message: 'User exists!' });
    }
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const user = await CRUD.create(User, data);

    return res.status(201).json(user);
  }

  async index(req: Request, res: Response) {
    const users = await CRUD.readAll(User)
      .sort({ createdAt: -1 })
      .populate('companys');
    return res.status(200).send(users);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const user = await CRUD.findOne(User, id).populate('companys');
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    return res.status(200).json(user);
  }
  async findUser(req: Request, res: Response) {
    const { email } = req.params;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    return res.status(200).json(user);
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { email } = req.body;
    const data = { email };
    const schema = Yup.object().shape({
      email: Yup.string().email().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const user = await CRUD.update(User, id, data);
    if (user['n'] === 0) {
      return res.status(404).json({ message: 'User not found!' });
    }

    return res.status(200).json(user);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const user = await User.findByIdAndDelete({ _id: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }
    return res.status(200).json(user);
  }
}

export default new UserController();
