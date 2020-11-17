import { Request, Response } from 'express';
import User from '../models/user'

class UserController {
  async store(req: Request, res: Response) {
    try {
      const { name } = req.body
      if (!name || name === "") {
        return res.status(400).json({ error: 'Field name is required!' })
      }
      await User.create(req.body).then(resp => res.status(200).json(req.body)).catch(err=>console.log(err))

    } catch (err) {
      console.log(err)
      return res.status(500).json({ error: 'Internal error server' })

    }

  }
}

export default new UserController