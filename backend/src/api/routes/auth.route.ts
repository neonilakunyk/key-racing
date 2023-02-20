import { Router } from 'express';
import { run } from 'common/helpers';
import {
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
  setPasswordSchema,
  refreshTokenSchema,
  loginGoogleSchema,
} from 'common/validations';
import {
  login,
  register,
  resetPassword,
  setPassword,
  refreshTokens,
  logout,
  loginGoogle,
  getLoginGoogleUrl,
} from 'services';
import { validationMiddleware } from 'api/middlewares';

const router: Router = Router();

router.post(
  '/register',
  validationMiddleware({ body: signUpSchema }),
  run((req) => register(req.body)),
);

router.post(
  '/login',
  validationMiddleware({ body: loginSchema }),
  run((req) => login(req.body)),
);

router.post(
  '/reset-password',
  validationMiddleware({ body: resetPasswordSchema }),
  run((req) => resetPassword(req.body)),
);

router.post(
  '/set-password',
  validationMiddleware({ body: setPasswordSchema }),
  run((req) => setPassword(req.body)),
);

router.post(
  '/refresh',
  validationMiddleware({ body: refreshTokenSchema }),
  run((req) => refreshTokens(req.body)),
);

router.post(
  '/logout',
  validationMiddleware({ body: refreshTokenSchema }),
  run((req) => logout(req.body)),
);

router.post(
  '/login/google',
  validationMiddleware({ body: loginGoogleSchema }),
  run((req) => loginGoogle(req.body)),
);

router.get(
  '/login/google',
  run(() => getLoginGoogleUrl()),
);

export { router as authRoute };
