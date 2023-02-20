import { basename } from 'path';
import { usersRepository } from 'data/repositories';
import { deleteLocally } from 'common/helpers';
import { IUser } from 'common/interfaces';
import { HttpError } from 'common/exceptions';
import { HttpCode, HttpErrorMessage } from 'common/enums';
import {
  deleteInS3,
  getSignedUrl,
  isFileExistsInS3,
  uploadToS3,
} from 'common/utils';
import { UserRatingInfo } from 'common/types';

export const getUserById = async (userId: number): Promise<IUser> => {
  const user = await usersRepository.getById(userId);
  if (!user) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
    });
  }
  return user;
};

export const updateUserInfo = async (
  userId: number,
  body: Partial<IUser>,
): Promise<IUser> => {
  const user = await usersRepository.patchById(userId, body);
  if (!user) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
    });
  }
  return user;
};

export const updateAvatar = async (
  id: number,
  file?: Express.Multer.File,
): Promise<IUser> => {
  if (!file) {
    throw new HttpError({
      status: HttpCode.UNPROCESSABLE_ENTITY,
      message: HttpErrorMessage.NO_FILE,
    });
  }
  const userToUpdate = await usersRepository.getById(id);
  if (!userToUpdate) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
    });
  }
  const { photoUrl } = userToUpdate;
  if (photoUrl) {
    const fileName = basename(photoUrl);
    const isExistsAvatar = await isFileExistsInS3(fileName);
    if (isExistsAvatar) {
      await deleteInS3(photoUrl);
    }
  }

  const uploadedFile = await uploadToS3(file);
  deleteLocally(file.path);
  const { Location } = uploadedFile;

  await usersRepository.patchById(id, {
    photoUrl: Location ?? userToUpdate.photoUrl,
  });
  const newPhotoUrl = await getSignedUrl(Location);
  return { ...userToUpdate, photoUrl: newPhotoUrl };
};

export const deleteAvatar = async (id: number): Promise<void> => {
  const userToUpdate = await usersRepository.getById(id);
  if (!userToUpdate) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
    });
  }
  const { photoUrl } = userToUpdate;
  if (photoUrl) {
    const fileName = basename(photoUrl);
    const isExistsAvatar = await isFileExistsInS3(fileName);
    if (isExistsAvatar) {
      await deleteInS3(photoUrl);
    }
    await usersRepository.patchById(id, { photoUrl: null });
  }
};

export const getUsersRating = async (): Promise<UserRatingInfo[]> => {
  return usersRepository.getAllWithPublicRecords();
};

export const updateRecord = async (
  { record }: Pick<IUser, 'record'>,
  userId: number,
): Promise<void> => {
  const user = await usersRepository.getById(userId);
  if (!user) {
    throw new HttpError({
      status: HttpCode.NOT_FOUND,
      message: HttpErrorMessage.NO_USER_WITH_SUCH_ID,
    });
  }
  if (user.record < record) {
    await usersRepository.patchById(userId, { record });
  }
};
