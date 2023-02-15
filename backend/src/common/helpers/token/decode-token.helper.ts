/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from 'jsonwebtoken';

const decodeToken = (token: string): Record<string, unknown> => {
  return jwt.decode(token, { json: true }) as Record<string, unknown>;
};

export { decodeToken };
