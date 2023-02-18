import { HttpCode, UserKey } from 'common/enums';
import { Request, RequestHandler } from 'express';

export const run = <T, R extends Request>(
  method: (req: R) => Promise<T>,
): RequestHandler => {
  return async (req, res, next): Promise<void> => {
    try {
      const result = await method(req as R);
      if (
        result &&
        Object.prototype.hasOwnProperty.call(result, UserKey.PASSWORD)
      ) {
        res.send({ ...result, password: null });
      } else if (result) {
        res.send(result);
      } else {
        res.sendStatus(HttpCode.NO_CONTENT);
      }
    } catch (err) {
      next(err);
    }
  };
};
