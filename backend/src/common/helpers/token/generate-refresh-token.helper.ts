import { REFRESH_TOKEN_EXPIRES_IN } from 'common/constants';
import { generateToken } from './generate-token.helper';

const generateRefreshToken = (userId: number): string => {
  return generateToken(userId, REFRESH_TOKEN_EXPIRES_IN);
};

export { generateRefreshToken };
