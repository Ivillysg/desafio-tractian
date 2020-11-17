import { Request, Response } from 'express';
import User from '../models/user'

class UserController {
  async store(req: Request, res: Response) {
    return res.status(200).send(req.body)
  }
}

export default new UserController