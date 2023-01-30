import jwt from 'jsonwebtoken';
import { google } from 'googleapis';
import { Types } from 'mongoose';
import { HttpErrorMessage, HttpCode, RoomType } from '../common/enums';
import {
  usersRepository,
  refreshTokensRepository,
  settingsRepository,
  roomsRepository,
} from '../data/repositories';
import {
  hash,
  verify,
  sendMail,
  generateTokens,
  generateAccessToken,
} from '../common/utils';
import { HttpError } from '../exceptions';
import {
  IResetPassword,
  IRegister,
  IRefreshToken,
  ITokens,
  ILogin,
  ISetPassword,
  IUserWithTokens,
  IUser,
  IUserCreation,
} from '../common/interfaces';
import { env } from '../env';
import { IUserEntity } from '../data/entities';
import { PERSONAL_ROOM_NAME } from '../common/constants';

const setTokens = async (user: Partial<IUser>): Promise<ITokens> => {
  const tokens = generateTokens(user.id);
  await refreshTokensRepository.create({
    userId: new Types.ObjectId(user.id),
    token: tokens.refreshToken,
  });

  return tokens;
};

export const register = async (
  userInfo: IRegister,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const existingUser = await usersRepository.getOne({
    email: userInfo.email.toLowerCase(),
  });

  if (existingUser) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.EMAIL_ALREADY_EXISTS,
    });
  }

  const hashedPassword = await hash(userInfo.password);
  const email = userInfo.email.toLowerCase();
  const { fullName } = userInfo;

  return await createUser({ email, fullName, password: hashedPassword });
};

export const login = async (
  body: ILogin,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const user = await usersRepository.getOne({
    email: body.email.toLowerCase(),
  });
  if (!user || !user.password) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_LOGIN_DATA,
    });
  }

  const isPasswordCorrect = await verify(body.password, user.password);
  if (!isPasswordCorrect) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_LOGIN_DATA,
    });
  }

  return getIUserWithTokens(user);
};

export const resetPassword = async (body: IResetPassword): Promise<void> => {
  const user = await usersRepository.getOne({
    email: body.email.toLowerCase(),
  });
  if (!user) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.NO_SUCH_EMAIL,
    });
  }

  const token = generateAccessToken(user.id);
  const { app } = env;
  const url = `${app.url}/set-password?token=${token}`;

  await sendMail({ to: user.email, subject: 'Reset Password', text: url });
};

export const setPassword = async (body: ISetPassword): Promise<void> => {
  const { token, password } = body;
  if (!token) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.INVALID_TOKEN,
    });
  }

  const { app } = env;
  const decoded = jwt.verify(token, app.secretKey) as {
    userId: string;
  };

  const hashedPassword = await hash(password);
  await usersRepository.updateOne(
    { _id: decoded.userId },
    { password: hashedPassword },
  );
};

export const refreshTokens = async (body: IRefreshToken): Promise<ITokens> => {
  try {
    const { refreshToken } = body;
    jwt.verify(refreshToken, env.app.secretKey);
    const userRefreshToken = await refreshTokensRepository.getOne({
      token: refreshToken,
    });
    if (!userRefreshToken?.token) {
      throw new Error();
    }
    await refreshTokensRepository.removeOne(userRefreshToken);
    const tokens = await setTokens({ id: userRefreshToken.userId });
    return tokens;
  } catch {
    throw new HttpError({
      status: HttpCode.UNAUTHORIZED,
      message: HttpErrorMessage.UNAUTHORIZED,
    });
  }
};

export const logout = async (body: IRefreshToken): Promise<void> => {
  const { refreshToken } = body;
  const userRefreshToken = await refreshTokensRepository.getOne({
    token: refreshToken,
  });
  if (userRefreshToken?.token) {
    await refreshTokensRepository.removeOne(userRefreshToken);
  }
};

export const getLoginGoogleUrl = async (): Promise<{ url: string }> => {
  const { clientId, clientSecret, redirectUrl } = env.google;
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl,
  );
  const scopes = ['profile', 'email', 'openid'];
  return {
    url: oauth2Client.generateAuthUrl({
      scope: scopes,
    }),
  };
};

export const loginGoogle = async (
  code: string,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const { clientId, clientSecret, redirectUrl } = env.google;
  const oauth2Client = new google.auth.OAuth2(
    clientId,
    clientSecret,
    redirectUrl,
  );
  const { tokens } = await oauth2Client.getToken(code);
  const decodeToken = jwt.decode(tokens.id_token, { json: true });
  const { email, name, picture } = decodeToken;
  const user = await usersRepository.getOne({ email });
  if (user) {
    return getIUserWithTokens(user);
  }
  return await createUser({ fullName: name, email, avatar: picture });
};

const getIUserWithTokens = async (
  user: IUserEntity,
): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const tokens = await setTokens(user);
  const { id, fullName, email, avatar } = user;
  return {
    id,
    fullName,
    email,
    avatar,
    ...tokens,
  };
};

const createUser = async ({
  email,
  fullName,
  avatar,
  password,
}: IUserCreation): Promise<Omit<IUserWithTokens, 'refreshToken'>> => {
  const userData = {
    email,
    fullName,
    avatar,
  };
  if (password) {
    Object.assign(userData, { password });
  }
  if (avatar) {
    Object.assign(userData, { avatar });
  }
  await usersRepository.create(userData);
  const newUser = await usersRepository.getOne({ email });
  await settingsRepository.create({ userId: newUser._id });
  await roomsRepository.create(
    {
      name: PERSONAL_ROOM_NAME,
      type: RoomType.PERSONAL,
    },
    newUser.id,
  );
  return getIUserWithTokens(newUser);
};
