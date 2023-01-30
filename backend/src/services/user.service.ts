import { usersRepository } from '../data/repositories';
import {
  deleteFile,
  isFileExists,
  uploadFile,
  unlinkFile,
} from '../common/helpers';
import { IUser, IUserWithRecord } from '../common/interfaces';

export const getUserById = async (id: string): Promise<IUser> => {
  const { fullName, email, avatar } = await usersRepository.getOne({
    _id: id,
  });

  return {
    id,
    fullName,
    email,
    avatar,
  };
};

export const updateUserInfo = async (
  id: string,
  body: Partial<IUser>,
): Promise<IUser> => {
  if (body.fullName) {
    await usersRepository.updateOne(
      {
        _id: id,
      },
      { fullName: body.fullName },
    );
  }

  const { fullName, email, avatar } = await usersRepository.getOne({
    _id: id,
  });

  return {
    id,
    fullName,
    email,
    avatar,
  };
};

export const updateAvatar = async (
  id: string,
  file: Express.Multer.File,
): Promise<IUser> => {
  const userToUpdate = await usersRepository.getOne({
    _id: id,
  });

  if (userToUpdate.avatar) {
    const fileName = userToUpdate.avatar.split('/').pop();
    const isExistsAvatar = await isFileExists(fileName);
    if (isExistsAvatar) {
      await deleteFile(userToUpdate.avatar);
    }
  }

  const uploadedFile = await uploadFile(file);
  unlinkFile(file.path);
  const { Location } = uploadedFile;

  await usersRepository.updateOne(
    {
      _id: id,
    },
    { avatar: Location || userToUpdate.avatar },
  );

  const { fullName, email, avatar } = await usersRepository.getOne({
    _id: id,
  });

  return {
    id,
    fullName,
    email,
    avatar,
  };
};

export const deleteAvatar = async (id: string): Promise<void> => {
  const userToUpdate = await usersRepository.getOne({
    _id: id,
  });
  if (userToUpdate?.avatar) {
    await usersRepository.updateOne(
      {
        _id: id,
      },
      { avatar: '' },
    );
  }
};

export const getUsersRating = async (): Promise<IUserWithRecord[]> => {
  const usersWithSettings = await usersRepository.getAllWithSettings();
  return usersWithSettings.map(({ _id, fullName, avatar, record }) => ({
    fullName,
    avatar,
    record,
    id: _id,
  }));
};

export const updateRecord = async (
  record: number,
  userId: string,
): Promise<void> => {
  const user = await usersRepository.getOne({ _id: userId });
  await usersRepository.updateOne(
    { _id: userId },
    { record: Math.max(user.record, record) },
  );
};
