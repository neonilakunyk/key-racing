import multer, { FileFilterCallback, Multer } from 'multer';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
): void => {
  if (['image/jpeg', 'image/png', 'image/gif'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type, only jpg, png and gif allowed'));
  }
};

const uploadLocally = (): Multer => {
  const storage = multer.diskStorage({
    destination: function (_req, _file, cb) {
      const dirPath = './uploads/';

      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
      }

      cb(null, dirPath);
    },
    filename: function (req, file, cb) {
      const fileName =
        req.params.userId + '.' + Date.now() + path.extname(file.originalname);
      cb(null, fileName);
    },
  });
  return multer({ fileFilter, storage });
};

export { uploadLocally };
