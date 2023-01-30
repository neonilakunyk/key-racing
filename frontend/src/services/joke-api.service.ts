import { IJoke } from 'common/interfaces/interfaces';
import { http } from './http.service';

class JokeApi {
  private http = http;
  private URL =
  'https://v2.jokeapi.dev/joke/Any?amount=1&type=single';

  public async getJoke(): Promise<IJoke> {
    const data: IJoke = await this.http.load(this.URL);
    return data;
  }
}

export const jokeApi = new JokeApi();
