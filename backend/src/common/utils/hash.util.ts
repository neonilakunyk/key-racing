import bcrypt from 'bcrypt';

const hash = async (value: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(value, salt);
};

const verify = async (value: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(value, hash);
};

export { hash, verify };
