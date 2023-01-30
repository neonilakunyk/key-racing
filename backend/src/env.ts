import * as dotenv from 'dotenv';
import { getOsEnv } from './common/helpers/path.helper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('PORT'),
    secretKey: getOsEnv('APP_SECRET'),
    url: getOsEnv('APP_URL'),
  },
  db: {
    password: getOsEnv('DB_PASSWORD'),
    cluster: getOsEnv('CLUSTER'),
    name: getOsEnv('DB_NAME'),
  },
  s3: {
    accessKeyId: getOsEnv('AWS_ACCESS_KEY'),
    secretAccessKey: getOsEnv('AWS_SECRET_KEY'),
    bucketName: getOsEnv('AWS_BUCKET_NAME'),
  },
  mailer: {
    service: getOsEnv('MAILER_SERVICE'),
    auth: {
      user: getOsEnv('MAILER_AUTH_USER'),
      clientId: getOsEnv('MAILER_AUTH_CLIENT_ID'),
      clientSecret: getOsEnv('MAILER_AUTH_CLIENT_SECRET'),
      refreshToken: getOsEnv('MAILER_AUTH_REFRESH_TOKEN'),
    },
  },
  google: {
    clientId: getOsEnv('GOOGLE_CLIENT_ID'),
    clientSecret: getOsEnv('GOOGLE_CLIENT_SECRET'),
    redirectUrl: getOsEnv('GOOGLE_REDIRECT_URL'),
  },
} as const;
