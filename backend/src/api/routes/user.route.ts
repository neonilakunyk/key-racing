import { Router } from 'express';
import { IRequestWithUser } from 'common/interfaces';
import { run, uploadLocally } from 'common/helpers';
import {
  getUserById,
  updateUserInfo,
  updateAvatar,
  deleteAvatar,
  getUsersRating,
  updateRecord,
} from 'services';
import { validationMiddleware } from 'api/middlewares';
import { profileInfoSchema, userRecordSchema } from 'common/validations';

const router: Router = Router();

router.get(
  '/me/profile',
  run((req: IRequestWithUser) => getUserById(req.userId)),
);

router.put(
  '/me/profile',
  validationMiddleware({ body: profileInfoSchema }, { notRequired: true }),
  run((req: IRequestWithUser) => updateUserInfo(req.userId, req.body)),
);

router.put(
  '/me/avatar',
  uploadLocally().single('image'),
  run((req: IRequestWithUser) => updateAvatar(req.userId, req.file)),
);

router.delete(
  '/me/avatar',
  run((req: IRequestWithUser) => deleteAvatar(req.userId)),
);

router.get(
  '/rating',
  run(() => getUsersRating()),
);

router.put(
  '/rating',
  validationMiddleware({ body: userRecordSchema }),
  run((req: IRequestWithUser) => updateRecord(req.body, req.userId)),
);

export { router as userRoute };
