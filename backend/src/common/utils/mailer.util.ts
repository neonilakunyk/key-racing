import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { env } from 'env';
import { getAccessToken } from './oauth2.util';

/* 3-legged OAuth2 authentication
Application requests permissions from the client and gets refresh token that can be used to generate new access tokens.

auth – is the authentication object
  type – indicates authentication type, set it to ‘OAuth2’
  user – user email address (required)
  clientId – is the registered client id of the application
  clientSecret – is the registered client secret of the application
  refreshToken – is an optional refresh token.
                 If it is provided then Nodemailer tries to generate a new access token if existing one expires or fails
  accessToken – is the access token for the user.
                Required only if refreshToken is not available and there is no token refresh callback specified
  expires – is an optional expiration time for the current accessToken */

const {
  mailer: { refreshToken, user },
  google: { clientId, clientSecret },
} = env;

const createTransport = async (): Promise<nodemailer.Transporter> => {
  const token = await getAccessToken();

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      clientId,
      clientSecret,
      user,
      refreshToken,
      accessToken: token,
    },
  } as SMTPTransport.Options);
};

const sendMail = async (
  options: Pick<
    Mail.Options,
    'to' | 'bcc' | 'text' | 'subject' | 'attachments'
  >,
): Promise<void> => {
  const transporter = await createTransport();
  await transporter.sendMail(options);
};

export { sendMail };
