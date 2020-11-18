import { Request, Response } from 'express';
import Company from '../models/companys';
import Unit from '../models/unit';
import Active from '../models/active';

import CRUD from '../protocols/CRUD';
import * as Yup from 'yup';
import User from '../models/user';

class CompanyController {
  async store(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const IsUserExists: any = await User.findById(id);

    if (!IsUserExists) {
      return res.status(404).json({ message: 'User not found!' });
    }
    const { companys } = IsUserExists;

    const data = { name, assignedTo: id };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      assignedTo: Yup.string().required(),
    });
    await schema.validate(data, { abortEarly: false });

    const newCompany = await CRUD.create(Company, data);

    await User.findByIdAndUpdate(id, { companys: [...companys, newCompany] });

    return res.status(201).json(newCompany);
  }
  async index(req: Request, res: Response) {
    const companys = await CRUD.readAll(Company).populate('units');
    return res.status(200).json(companys);
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const company = await CRUD.findOne(Company, id).populate('units');
    if (!company) {
      return res.status(404).json({ message: 'Company not found!' });
    }
    return res.status(200).json(company);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const data = { name };
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const company = await CRUD.update(Company, id, data);
    if (company['n'] === 0) {
      return res.status(404).json({ message: 'Company not found!' });
    }

    return res.status(200).json(company);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const company = await CRUD.delete(Company, id);
    //Cascade
    await Unit.deleteOne({ company: id });
    await Active.deleteOne({ company: id });
    if (company['n'] === 0) {
      return res.status(404).json({ message: 'Company not found!' });
    }
    return res.status(200).json(company);
  }
}

export default new CompanyController();
