// import { HttpCode } from 'common/enums';
import { Request, RequestHandler } from 'express';

export const run = <T, R extends Request>(
  method: (req: R) => Promise<T>,
): RequestHandler => {
  return (req, _res, next): void => {
    method(req as R)
      .then((result) => {
        console.log(result);
        // return res.send(result);
        // return result ? res.send(result) : res.sendStatus(HttpCode.NO_CONTENT);
      })
      .catch(next);
  };
};
