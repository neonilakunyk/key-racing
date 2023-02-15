/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserId } from 'common/interfaces';
import { env } from 'env';
import jwt from 'jsonwebtoken';

const verifyToken = (token: string): IUserId => {
  return jwt.verify(token, env.app.secretKey) as IUserId;
};

export { verifyToken };
