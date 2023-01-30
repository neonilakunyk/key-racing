import { NextFunction, Request, Response } from 'express';
import { HttpCode, HttpErrorMessage } from '../../common/enums';
import { HttpError } from '../../common/errors';
import { logger } from '../../common/utils';

export const errorHandlerMiddleware = (
  err: HttpError,
  _: Request,
  res: Response,
  __: NextFunction,
): void => {
  let status = HttpCode.INTERNAL_SERVER_ERROR;
  let message: string = HttpErrorMessage.INTERNAL_SERVER_ERROR;

  if (err.name === 'HttpError') {
    status = err.status;
    message = err.message;
  }

  logger.error({ status, message });

  res.status(status).send({ error: message });
};
