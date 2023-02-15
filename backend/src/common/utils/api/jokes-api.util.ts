import { makeGetRequest } from 'common/helpers';
import { IJoke } from 'common/interfaces';
import { logger } from '../logger.util';

const getRandomJoke = async (): Promise<IJoke> => {
  try {
    const response = await makeGetRequest(
      'https://v2.jokeapi.dev/joke/Any?amount=1&type=single',
    );
    return response.data as IJoke;
  } catch (err: unknown) {
    logger.error((err as Error).message);
    return { joke: '' };
  }
};

export { getRandomJoke };
