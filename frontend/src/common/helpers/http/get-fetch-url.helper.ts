import * as queryString from 'query-string';

const getFetchUrl = (
  endpoint: string,
  queryParams?: Record<string, unknown>,
): string => {
  const fetchUrl = `${endpoint}${
    queryParams ? `?${queryString.stringify(queryParams)}` : ''
  }`;

  return fetchUrl;
};

export { getFetchUrl };
