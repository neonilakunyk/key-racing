import { HttpMethod, ContentType } from 'common/enums/enums';
import { IUser, IRoomUser, IText, ILink } from '../common/interfaces/interfaces';
import { http } from './http.service';

class GameApi {
  private http = http;
  private BASE = '/api/game';

  public async getText(roomId: string): Promise<IText> {
    return this.http.load(`${this.BASE}/${roomId}/text`);
  }

  public async getShareLink(roomId: string): Promise<ILink> {
    return this.http.load(`${this.BASE}/${roomId}/link`);
  }

  public async getParticipants(
    roomId: string,
  ): Promise<Omit<IUser, 'email'>[]> {
    return this.http.load(`${this.BASE}/${roomId}/users`);
  }

  public async addParticipant(
    payload: IRoomUser,
  ): Promise<Omit<IUser, 'email'>> {
    return this.http.load(`${this.BASE}/add-user`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async deleteParticipant(payload: IRoomUser): Promise<void> {
    return this.http.load(`${this.BASE}/delete-user`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async deleteText(roomId: string): Promise<void> {
    return this.http.load(`${this.BASE}/delete-text`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify({ roomId }),
      contentType: ContentType.JSON,
    });
  }
}

export const gameApi = new GameApi();
