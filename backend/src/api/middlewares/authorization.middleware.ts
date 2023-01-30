import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { HttpCode, HttpErrorMessage } from '../../common/enums';
import { WHITE_LIST_ROUTES } from '../../common/constants';
import { IRequestWithUser } from 'src/common/interfaces/http';
import { env } from '../../env';

export const auth = (
  req: IRequestWithUser,
  res: Response,
  next: NextFunction,
): void => {
  if (WHITE_LIST_ROUTES.includes(req.path)) {
    return next();
  }

  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const decoded = jwt.verify(token, env.app.secretKey) as { userId: string };

    req.userId = decoded.userId;

    next();
  } catch (err) {
    res
      .status(HttpCode.UNAUTHORIZED)
      .json({ msg: HttpErrorMessage.UNAUTHORIZED, error: err });
  }
};
