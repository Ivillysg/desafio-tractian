import { Request, Response } from 'express';
import Companys from '../models/companys';
import Unit from '../models/unit';
import * as Yup from 'yup';

class UnitController {
  async store(req: Request, res: Response) {
    //pego o id do empresa
    const { id } = req.params;

    const IsCompanyExists: any = await Companys.findById(id);
    //verifico se existe essa empresa!
    if (!IsCompanyExists) {
      return res.status(404).json({ message: 'Company not found!' });
    }
    const { name } = req.body;
    //pego o id do user
    const { assignedTo } = IsCompanyExists;

    const data = { name, company: id, assignedTo };

    //validate
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      company: Yup.string().required(),
      assignedTo: Yup.string().required(),
    });

    await schema.validate(data, { abortEarly: false });

    //criar a unidade
    const unit = await Unit.create(data);

    return res.status(201).json(unit);
  }

  async index(req: Request, res: Response) {
    const units = await Unit.find();
    return res.status(200).json(units);
  }
}

export default new UnitController();
