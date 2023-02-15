/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITokens } from 'common/interfaces';
import { generateAccessToken } from './generate-access-token.helper';
import { generateRefreshToken } from './generate-refresh-token.helper';

const generateTokens = (userId: number): ITokens => {
  return {
    accessToken: generateAccessToken(userId),
    refreshToken: generateRefreshToken(userId),
  };
};

export { generateTokens };
