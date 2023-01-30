import {
  IRoom,
  IRoomCreation,
  IRoomShare,
} from '../common/interfaces/interfaces';
import { ContentType, HttpMethod } from '../common/enums/enums';
import { http } from './http.service';

class RoomApi {
  private http = http;
  private BASE = '/api/room';

  public async create(payload: IRoomCreation): Promise<IRoom> {
    return this.http.load(this.BASE, {
      method: HttpMethod.POST,
      payload: JSON.stringify(payload),
      contentType: ContentType.JSON,
    });
  }

  public async getRooms(): Promise<IRoom[]> {
    return this.http.load(this.BASE);
  }

  public async getRoom(id: string): Promise<IRoom> {
    return this.http.load(`${this.BASE}/${id}`);
  }

  public async sendLinkByEmails(payload: IRoomShare): Promise<void> {
    return this.http.load(`${this.BASE}/share-by-email`, {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(payload),
    });
  }
}

export const roomApi = new RoomApi();
