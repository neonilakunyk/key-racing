import jwt from 'jsonwebtoken';
import { env } from 'env';

const generateToken = (userId: number, expiresIn: string): string => {
  return jwt.sign({ userId }, env.app.secretKey, { expiresIn });
};

export { generateToken };
