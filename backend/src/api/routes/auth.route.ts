import { Router } from 'express';
import { run } from '../../common/helpers';
import {
  signUpSchema,
  loginSchema,
  resetPasswordSchema,
  setPasswordSchema,
} from '../../common/validations';
import {
  login,
  register,
  resetPassword,
  setPassword,
  refreshTokens,
  logout,
  loginGoogle,
  getLoginGoogleUrl,
} from '../../services';
import { validationMiddleware } from '../middlewares';
const router: Router = Router();

router.post(
  '/register',
  validationMiddleware(signUpSchema),
  run((req) => register(req.body)),
);

router.post(
  '/login',
  validationMiddleware(loginSchema),
  run((req) => login(req.body)),
);

router.post(
  '/reset-password',
  validationMiddleware(resetPasswordSchema),
  run((req) => resetPassword(req.body)),
);

router.post(
  '/set-password',
  validationMiddleware(setPasswordSchema),
  run((req) => setPassword(req.body)),
);

router.post(
  '/refresh',
  run((req) => refreshTokens(req.body)),
);

router.post(
  '/logout',
  run((req) => logout(req.body)),
);

router.post(
  '/login/google',
  run((req) => loginGoogle(req.body.code)),
);

router.get(
  '/login/google',
  run(() => getLoginGoogleUrl()),
);

export default router;
