import { Router } from 'express';
import { IRequestWithUser } from '../../common/interfaces';
import { run, upload } from '../../common/helpers';
import {
  getUserById,
  updateUserInfo,
  updateAvatar,
  deleteAvatar,
  getUsersRating,
  updateRecord,
} from '../../services';
import { validationMiddleware } from '../middlewares';
import { profileInfoSchema } from '../../common/validations';

const router: Router = Router();

router.get(
  '/me/profile',
  run((req: IRequestWithUser) => getUserById(req.userId)),
);

router.get(
  '/rating',
  run(() => getUsersRating()),
);

router.put(
  '/rating',
  run((req: IRequestWithUser) => updateRecord(req.body.record, req.userId)),
);

router.put(
  '/:id/profile',
  validationMiddleware(profileInfoSchema),
  run((req) => updateUserInfo(req.params.id, req.body)),
);

router.put(
  '/:id/avatar',
  upload().single('image'),
  run((req) => updateAvatar(req.params.id, req.file)),
);

router.delete(
  '/:id/avatar',
  run((req: IRequestWithUser) => deleteAvatar(req.userId)),
);

export default router;
