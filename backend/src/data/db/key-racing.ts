import mongoose, { ConnectOptions } from 'mongoose';
import { logger } from '../../common/utils';
import { env } from '../../env';

const { db } = env;

export const connectDB = (): void => {
  const connect = (): void => {
    mongoose
      .connect(`mongodb+srv://an:${db.password}@${db.cluster}/${db.name}`, {
        useNewUrlParser: true,
        retryWrites: true,
        useUnifiedTopology: true,
      } as ConnectOptions)
      .then(() => {
        return logger.info('Successfully connected to db');
      })
      .catch((error) => {
        logger.error('Error connecting to database: ', error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on('disconnected', connect);
};
