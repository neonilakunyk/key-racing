import {
  BOOKS_API_MAX_START_INDEX,
  BOOKS_API_MIN_START_INDEX,
  BOOKS_API_AUTHOR,
  DEFAULT_RACING_TEXT,
} from 'common/constants';
import { makeGetRequest, randomInteger } from 'common/helpers';
import { IGameText } from 'common/interfaces';
import { BooksApiResponse } from 'common/interfaces';
import { logger } from '../logger.util';
import { getAccessToken } from '../oauth2.util';

const getRandomDescription = async (): Promise<IGameText> => {
  try {
    const accessToken = await getAccessToken();
    const rand = randomInteger(
      BOOKS_API_MIN_START_INDEX,
      BOOKS_API_MAX_START_INDEX,
    );
    const response = await makeGetRequest(
      `https://www.googleapis.com/books/v1/volumes?q=inauthor:${BOOKS_API_AUTHOR}&startIndex=${rand}&maxResults=1`,
      {
        headers: {
          Authorization: 'token ' + accessToken,
        },
      },
    );
    const text =
      (response.data as BooksApiResponse).items.pop()?.description ??
      DEFAULT_RACING_TEXT;
    return { text };
  } catch (err: unknown) {
    logger.error((err as Error).message);
    return { text: DEFAULT_RACING_TEXT };
  }
};

export { getRandomDescription };
