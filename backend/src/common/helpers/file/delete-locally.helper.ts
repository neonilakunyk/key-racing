import util from 'util';
import fs from 'fs';

export const deleteLocally = (filePath: string): Promise<void> => {
  return util.promisify(fs.unlink)(filePath);
};
