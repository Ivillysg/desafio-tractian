import { Request, Response } from 'express';
import Companys from '../models/companys';
import CRUD from '../protocols/CRUD';
import * as Yup from 'yup';
import User from '../models/user';

class CompanyController {
  async store(req: Request, res: Response) {
    const { name, assignedTo } = req.body;

    const data = { name, assignedTo };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      assignedTo: Yup.string().required(),
    });
    await schema.validate(data, { abortEarly: false });

    const newCompany = await CRUD.create(Companys, data);
    await User.findByIdAndUpdate(assignedTo, { companys: newCompany._id });

    return res.status(201).json(newCompany);
  }
  async index(req: Request, res: Response) {
    const companys = await CRUD.readAll(Companys);
    return res.status(200).json(companys);
  }
}

export default new CompanyController();
