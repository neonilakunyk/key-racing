import { IUser, IUserWithTokens } from 'common/interfaces';
import { HttpMethod, ContentType } from 'common/enums';
import { UserRatingInfo } from 'common/types';
import { http } from './http.service';

class UserApi {
  private http = http;
  private BASE = '/api/user';

  public async getCurrentUserInfo(): Promise<IUserWithTokens> {
    return await this.http.load(`${this.BASE}/me/profile`);
  }

  public async update(updatePayload: Partial<IUser>): Promise<IUser> {
    const updateResponse: IUser = await this.http.load(
      `${this.BASE}/me/profile`,
      {
        method: HttpMethod.PUT,
        payload: JSON.stringify(updatePayload),
        contentType: ContentType.JSON,
      },
    );

    return updateResponse;
  }

  public async uploadAvatar(file: File, fileName: string): Promise<IUser> {
    const fd = new FormData();
    fd.append('image', file, fileName);

    const uploadResponse: IUser = await this.http.load(
      `${this.BASE}/me/avatar`,
      {
        method: HttpMethod.PUT,
        payload: fd,
      },
    );

    return uploadResponse;
  }

  public async deleteAvatar(): Promise<void> {
    return this.http.load(`${this.BASE}/me/avatar`, {
      method: HttpMethod.DELETE,
    });
  }

  public async getUsersRating(): Promise<UserRatingInfo[]> {
    return await this.http.load(`${this.BASE}/rating`);
  }

  public async updateRecord(record: number): Promise<void> {
    return await this.http.load(`${this.BASE}/rating`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify({ record }),
      contentType: ContentType.JSON,
    });
  }
}

export const userApi = new UserApi();
