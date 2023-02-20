import { HttpMethod, ContentType } from 'common/enums';
import {
  IUser,
  IRoomUser,
  IGameText,
  IGameLink,
  IJoke,
} from '../common/interfaces';
import { http } from './http.service';

class GameApi {
  private http = http;
  private BASE = '/api/game';

  public async getText(roomId: number): Promise<IGameText> {
    return this.http.load(`${this.BASE}/${roomId}/text`);
  }

  public async getShareLink(roomId: number): Promise<IGameLink> {
    return this.http.load(`${this.BASE}/${roomId}/link`);
  }

  public async getParticipants(roomId: number): Promise<IUser[]> {
    return this.http.load(`${this.BASE}/${roomId}/users`);
  }

  public async addParticipant(payload: IRoomUser): Promise<void> {
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

  public async deleteText(roomId: number): Promise<void> {
    return this.http.load(`${this.BASE}/delete-text`, {
      method: HttpMethod.PUT,
      payload: JSON.stringify({ roomId }),
      contentType: ContentType.JSON,
    });
  }

  public async getJoke(): Promise<IJoke> {
    return this.http.load(`${this.BASE}/joke`);
  }
}

export const gameApi = new GameApi();
