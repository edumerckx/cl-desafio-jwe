import { Request, Response } from 'express';
import { services } from '../services';

export const controller = {
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const encrypted = await services.login(email, password);
    res.json({ encrypted });
  },
  decrypt: async (req: Request, res: Response) => {
    const { encrypted } = req.body;
    const data = await services.decrypt(encrypted);
    res.json(data);
  },
  history: async (req: Request, res: Response) => {
    const records = await services.history();
    res.json({ records });
  }
};
