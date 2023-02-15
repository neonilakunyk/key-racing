import { Request, Response, NextFunction } from 'express';
import { HttpCode, HttpErrorMessage } from 'common/enums';
import { WHITE_LIST_ROUTES } from 'common/constants';
import { IRequestWithUser } from 'common/interfaces';
import { verifyToken } from 'common/helpers';

export const auth = (req: Request, res: Response, next: NextFunction): void => {
  if (WHITE_LIST_ROUTES.includes(req.path)) {
    return next();
  }

  try {
    const authHeader = req.headers['authorization'];
    if (authHeader) {
      const token = authHeader && authHeader.split(' ')[1]; // remove Bearer part
      const decoded = verifyToken(token);
      req = { ...req, userId: decoded.userId } as IRequestWithUser;
      next();
    } else {
      throw new Error();
    }
  } catch (err) {
    res
      .status(HttpCode.UNAUTHORIZED)
      .json({ msg: HttpErrorMessage.UNAUTHORIZED, error: err });
  }
};
