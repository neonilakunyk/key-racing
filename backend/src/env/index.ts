import * as dotenv from 'dotenv';
import { getEnvVar } from 'common/helpers';

dotenv.config();

const env = {
  app: {
    port: getEnvVar('PORT'),
    secretKey: getEnvVar('APP_SECRET') ?? '',
    url: getEnvVar('APP_URL'),
  },
  db: {
    client: getEnvVar('DB_CLIENT'),
    url: getEnvVar('DB_URL'),
    poolMin: Number(getEnvVar('DB_POOL_MIN')),
    poolMax: Number(getEnvVar('DB_POOL_MAX')),
  },
  s3: {
    accessKeyId: getEnvVar('AWS_ACCESS_KEY'),
    secretAccessKey: getEnvVar('AWS_SECRET_KEY'),
    bucketName: getEnvVar('AWS_BUCKET_NAME') ?? '',
  },
  mailer: {
    service: getEnvVar('MAILER_SERVICE'),
    user: getEnvVar('MAILER_AUTH_USER'),
  },
  google: {
    clientId: getEnvVar('GOOGLE_CLIENT_ID'),
    clientSecret: getEnvVar('GOOGLE_CLIENT_SECRET'),
    redirectUrl: getEnvVar('GOOGLE_REDIRECT_URL'),
    refreshToken: getEnvVar('GOOGLE_REFRESH_TOKEN'),
  },
} as const;

export { env };
