import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const makeGetRequest = async <ResponseType>(
  requestUrl: string,
  requestConfig?: AxiosRequestConfig,
): Promise<AxiosResponse<ResponseType>> => {
  const response: AxiosResponse<ResponseType> = await axios.get(
    requestUrl,
    requestConfig,
  );

  return response;
};

export { makeGetRequest };
