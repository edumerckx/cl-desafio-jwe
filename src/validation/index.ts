import { loginSchema } from '../schemas';
import { Request, Response, NextFunction } from 'express';

export const checkEnvVars = () => {
  const requiredEnvVars = [
    'HTTP_PORT',
    'DATABASE_URL',
    'PRIVATE_KEY_FILE',
    'PUBLIC_KEY_FILE',
    'ALGORITHM',
    'ENCRYPT_ALGORITHM'
  ];
  let hasErrors: boolean = false;

  for (const envVar of requiredEnvVars) {
    if (!process.env[envVar]) {
      hasErrors = true;
      throw new Error(`${envVar} is not defined`);
    }
  }

  if (hasErrors) {
    process.exit(1);
  }
};

export const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body = loginSchema.parse(req.body);
    next();
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
