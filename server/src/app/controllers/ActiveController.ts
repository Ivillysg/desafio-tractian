import { Request, Response } from 'express';
import Unit from '../models/unit';
import Active from '../models/active';
import CRUD from '../protocols/CRUD';

import * as Yup from 'yup';

class ActiveController {
  async store(req: Request, res: Response) {
    //Pegar o id do Unit
    const { id } = req.params;
    //verificar se existe esse Unit
    const UnitExists: any = await Unit.findById(id);
    if (!UnitExists) {
      return res.status(404).json({ message: 'Unit not found!' });
    }
    //Criar a active
    const { name, description, model, image, status, healthScore } = req.body;
    const { assignedTo, company, actives } = UnitExists;
    const data = {
      name,
      description,
      model,
      image,
      assignedTo,
      unit: id,
      company,
      status,
      healthScore,
    };
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      model: Yup.string().required(),
      image: Yup.string().required(),
      assignedTo: Yup.string().required(),
      unit: Yup.string().required(),
      company: Yup.string().required(),
    });
    await schema.validate(data, { abortEarly: false });
    const newActive = await CRUD.create(Active, data);
    await Unit.findByIdAndUpdate(id, { actives: [...actives, newActive] });

    return res.status(201).json(newActive);
  }
  async index(req: Request, res: Response) {
    const units = await CRUD.readAll(Active).populate('actives');
    return res.status(200).json(units);
  }
  async show(req: Request, res: Response) {
    const { id } = req.params;
    const active = await CRUD.findOne(Active, id).populate('actives');
    if (!active) {
      return res.status(404).json({ message: 'Active not found!' });
    }
    return res.status(200).json(active);
  }
  async update(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description, model, image, status, healthScore } = req.body;
    const data = {
      name,
      description,
      model,
      image,
      status,
      healthScore,
    };
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      description: Yup.string().required(),
      model: Yup.string().required(),
      image: Yup.string().required(),
    });
    await schema.validate(data, { abortEarly: false });

    const active = await CRUD.update(Active, id, data);
    if (active['n'] === 0) {
      return res.status(404).json({ message: 'Active not found!' });
    }

    return res.status(200).json(active);
  }
  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const active = await CRUD.delete(Active, id);

    if (active['n'] === 0) {
      return res.status(404).json({ message: 'Active not found!' });
    }
    return res.status(200).json(active);
  }
}

export default new ActiveController();
