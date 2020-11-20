import { Request, Response } from 'express';
import Companys from '../models/companys';
import Unit from '../models/unit';
import CRUD from '../interface/CRUD';

import * as Yup from 'yup';

class UnitController {
  async store(req: Request, res: Response) {
    const { id } = req.params;

    const IsCompanyExists: any = await Companys.findById(id);
    if (!IsCompanyExists) {
      return res.status(404).json({ message: 'Company not found!' });
    }
    const { name } = req.body;
    const { assignedTo, units } = IsCompanyExists;

    const data = { name, company: id, assignedTo };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const newUnit = await Unit.create(data);
    await Companys.findByIdAndUpdate(id, { units: [...units, newUnit] });
    return res.status(201).json(newUnit);
  }

  async index(req: Request, res: Response) {
    const units = await Unit.find()
      .populate(['actives', 'company'])
      .sort({ createdAt: -1 });
    return res.status(200).json(units);
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const unit = await CRUD.findOne(Unit, id).populate('actives');
    if (!unit) {
      return res.status(404).json({ message: 'Unit not found!' });
    }
    return res.status(200).json(unit);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;
    const data = { name };
    const schema = Yup.object().shape({
      name: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    const unit = await CRUD.update(Unit, id, data);
    if (unit['n'] === 0) {
      return res.status(404).json({ message: 'Unit not found!' });
    }

    return res.status(200).json(unit);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const unit = await Unit.findByIdAndDelete(id);

    if (!unit) {
      return res.status(404).json({ message: 'Unit not found!' });
    }
    return res.status(200).json(unit);
  }
}

export default new UnitController();
