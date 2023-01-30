import {
  IGameSettings,
  ISecuritySettings,
  ISettings,
} from '../common/interfaces/interfaces';
import { ContentType, HttpMethod } from '../common/enums/enums';
import { http } from './http.service';

class SettingsApi {
  private http = http;
  private BASE = '/api/settings';

  public async getSettings(): Promise<ISettings> {
    return this.http.load(this.BASE);
  }

  public async setGameSettings(
    updatePayload: IGameSettings,
  ): Promise<IGameSettings> {
    const gameSettings: ISettings = await this.http.load(
      `${this.BASE}/game`,
      {
        method: HttpMethod.PUT,
        payload: JSON.stringify(updatePayload),
        contentType: ContentType.JSON,
      },
    );

    return gameSettings;
  }

  public async setSecuritySettings(
    updatePayload: ISecuritySettings,
  ): Promise<ISecuritySettings> {
    const securitySettings: ISettings = await this.http.load(
      `${this.BASE}/security`,
      {
        method: HttpMethod.PUT,
        payload: JSON.stringify(updatePayload),
        contentType: ContentType.JSON,
      },
    );

    return securitySettings;
  }
}

export const settingsApi = new SettingsApi();
