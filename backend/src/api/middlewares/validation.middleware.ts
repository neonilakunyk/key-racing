import { Request, Response, NextFunction } from 'express';
import { AnySchema } from 'yup';
import { HttpCode } from 'common/enums';
import { ValidationError } from 'common/exceptions';

export const validationMiddleware = <T extends AnySchema>(
  schema: T,
  context?: Record<string, unknown>,
) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const data = req.body;
    try {
      await schema.validate(data, { context });
      next();
    } catch (err: unknown) {
      if (err instanceof ValidationError) {
        const { errors } = err;

        res.status(HttpCode.BAD_REQUEST).send({
          messages: errors,
        });
      }
    }

    return next();
  };
};
