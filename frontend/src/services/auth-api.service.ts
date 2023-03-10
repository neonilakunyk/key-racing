import { HttpMethod, ContentType } from 'common/enums';
import {
  IResetPassword,
  ISetPassword,
  IRefreshToken,
  ILogin,
  IRegister,
  IUserWithTokens,
  IGoogleLoginUrl,
} from 'common/interfaces';
import { http } from './http.service';

class AuthApi {
  private http = http;
  private BASE = '/api/auth';

  public async loginUser(loginPayload: ILogin): Promise<IUserWithTokens> {
    const loginResponse: IUserWithTokens = await this.http.load(
      `${this.BASE}/login`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(loginPayload),
        contentType: ContentType.JSON,
      },
    );

    return loginResponse;
  }

  public async registerUser(
    registerPayload: IRegister,
  ): Promise<IUserWithTokens> {
    const registerResponse: IUserWithTokens = await this.http.load(
      `${this.BASE}/register`,
      {
        method: HttpMethod.POST,
        payload: JSON.stringify(registerPayload),
        contentType: ContentType.JSON,
      },
    );

    return registerResponse;
  }

  public async resetPassword(payload: IResetPassword): Promise<void> {
    return this.http.load(`${this.BASE}/reset-password`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async setPassword(payload: ISetPassword): Promise<void> {
    return this.http.load(`${this.BASE}/set-password`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async logout(payload: IRefreshToken): Promise<void> {
    return this.http.load(`${this.BASE}/logout`, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async getLoginGoogleUrl(): Promise<IGoogleLoginUrl> {
    return this.http.load(`${this.BASE}/login/google`);
  }

  public async loginGoogle(code: string): Promise<IUserWithTokens> {
    return this.http.load(`${this.BASE}/login/google`, {
      method: HttpMethod.POST,
      payload: JSON.stringify({ code }),
      contentType: ContentType.JSON,
    });
  }
}

export const authApi = new AuthApi();
