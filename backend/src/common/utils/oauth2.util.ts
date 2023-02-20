import { env } from 'env';
import { google as googleapis } from 'googleapis';

const {
  google: { clientId, clientSecret, redirectUrl, refreshToken },
} = env;

const oauth2Client = new googleapis.auth.OAuth2(
  clientId,
  clientSecret,
  redirectUrl,
);

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

const generateAuthUrl = (): string => {
  return oauth2Client.generateAuthUrl({
    scope: ['profile', 'email', 'openid'],
  });
};

const getAccessToken = async (): Promise<string | null | undefined> => {
  const { token } = await oauth2Client.getAccessToken();
  return token;
};

const getIdToken = async (code: string): Promise<string | null | undefined> => {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens.id_token;
};

export { generateAuthUrl, getAccessToken, getIdToken };
