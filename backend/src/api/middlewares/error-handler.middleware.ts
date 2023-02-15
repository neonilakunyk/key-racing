import { NextFunction, Request, Response } from 'express';
import { HttpCode, HttpErrorMessage } from 'common/enums';
import { HttpError } from 'common/exceptions';
import { logger } from 'common/utils';

export const errorHandlerMiddleware = (
  err: HttpError,
  _req: Request,
  res: Response,
  __next: NextFunction,
): void => {
  const isHttpError = err.name === 'HttpError';

  const status = isHttpError ? err.status : HttpCode.INTERNAL_SERVER_ERROR;
  const message = isHttpError
    ? err.message
    : HttpErrorMessage.INTERNAL_SERVER_ERROR;

  logger.error({ status, message });

  res.status(status).send({ error: message });
};
