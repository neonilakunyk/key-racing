import { ACCESS_TOKEN_EXPIRES_IN } from 'common/constants';
import { generateToken } from './generate-token.helper';

const generateAccessToken = (userId: number): string => {
  return generateToken(userId, ACCESS_TOKEN_EXPIRES_IN);
};

export { generateAccessToken };
