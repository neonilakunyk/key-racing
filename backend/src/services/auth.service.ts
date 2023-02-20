import { HttpErrorMessage, HttpCode, RoomType } from 'common/enums';
import {
  usersRepository,
  refreshTokensRepository,
  settingsRepository,
  roomsRepository,
} from 'data/repositories';
import {
  hash,
  verify,
  sendMail,
  generateAuthUrl,
  getIdToken,
  getSignedUrl,
} from 'common/utils';
import { HttpError } from 'common/exceptions';
import {
  IResetPassword,
  IRegister,
  IRefreshToken,
  ITokens,
  ILogin,
  ISetPassword,
  IUserWithTokens,
  IUserCreation,
  IUser,
  IGoogleLoginUrl,
  IGoogleUser,
  LoginGoogleCode,
} from 'common/interfaces';
import { env } from 'env';
import { PERSONAL_ROOM_NAME } from 'common/constants';
import {
  decodeToken,
  generateAccessToken,
  generateTokens,
  verifyToken,
} from 'common/helpers';

const setTokens = async (userId: number): Promise<ITokens> => {
  const tokens = generateTokens(userId);
  await refreshTokensRepository.create({
    userId,
    token: tokens.refreshToken,
  });

  return tokens;
};

const getUser = async (user: IUser): Promise<IUserWithTokens> => {
  const photoUrl = user.photoUrl
    ? await getSignedUrl(user.photoUrl)
    : user.photoUrl;
  const tokens = await setTokens(user.id);
  return {
    ...user,
    ...tokens,
    photoUrl,
  };
};

const createUser = async ({
  email,
  fullName,
  photoUrl,
  password,
}: IUserCreation): Promise<IUserWithTokens> => {
  const personalRoom = await roomsRepository.create({
    name: PERSONAL_ROOM_NAME,
    type: RoomType.PERSONAL,
  });
  const userData = {
    email,
    fullName,
    password: password ?? null,
    photoUrl: photoUrl ?? null,
    personalRoomId: personalRoom.id,
  };
  const newUser = await usersRepository.create(userData);
  await settingsRepository.createEmptyUserRecord(newUser.id);

  return getUser(newUser);
};

export const register = async (
  userInfo: IRegister,
): Promise<IUserWithTokens> => {
  const existingUser = await usersRepository.getByEmail(userInfo.email);

  if (existingUser) {
    throw new HttpError({
      status: HttpCode.CONFLICT,
      message: HttpErrorMessage.EMAIL_ALREADY_EXISTS,
    });
  }

  const hashedPassword = await hash(userInfo.password);
  const email = userInfo.email;

  return createUser({ ...userInfo, email, password: hashedPassword });
};

export const login = async (body: ILogin): Promise<IUserWithTokens> => {
  const user = await usersRepository.getByEmail(body.email);
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

  return getUser(user);
};

export const resetPassword = async (body: IResetPassword): Promise<void> => {
  const user = await usersRepository.getByEmail(body.email);
  if (!user) {
    throw new HttpError({
      status: HttpCode.BAD_REQUEST,
      message: HttpErrorMessage.NO_SUCH_EMAIL,
    });
  }

  const token = generateAccessToken(user.id);
  const url = `${env.app.url}/set-password?token=${token}`;
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

  const decoded = verifyToken(token);

  const hashedPassword = await hash(password);
  await usersRepository.patchById(decoded.userId, {
    password: hashedPassword,
  });
};

export const refreshTokens = async (body: IRefreshToken): Promise<ITokens> => {
  try {
    const { refreshToken } = body;
    verifyToken(refreshToken);
    const userRefreshToken = await refreshTokensRepository.getByToken(
      body.refreshToken,
    );
    if (!userRefreshToken) {
      throw new Error();
    }
    await refreshTokensRepository.removeByUserId(userRefreshToken.userId);
    const tokens = await setTokens(userRefreshToken.userId);
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
  const userRefreshToken = await refreshTokensRepository.getByToken(
    refreshToken,
  );
  if (userRefreshToken) {
    await refreshTokensRepository.removeByUserId(userRefreshToken.userId);
  }
};

export const getLoginGoogleUrl = async (): Promise<IGoogleLoginUrl> => {
  const url = generateAuthUrl();
  return { url };
};

export const loginGoogle = async ({
  code,
}: LoginGoogleCode): Promise<IUserWithTokens> => {
  const idToken = await getIdToken(code);
  if (!idToken) {
    throw new HttpError({
      status: HttpCode.UNAUTHORIZED,
      message: HttpErrorMessage.UNAUTHORIZED,
    });
  }
  const decodedToken = decodeToken(idToken);
  const { email, name, picture } = decodedToken as unknown as IGoogleUser;
  const user = await usersRepository.getByEmail(email);
  if (user) {
    return getUser(user);
  }
  return createUser({ fullName: name, email, photoUrl: picture });
};
