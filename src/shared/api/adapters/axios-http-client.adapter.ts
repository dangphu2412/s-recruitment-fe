import {
  HttpClient,
  HttpError,
  HttpRequest,
  HttpResponse
} from 'src/shared/models/http-client';
import axios, {
  AxiosError,
  AxiosInstance,
  default as AxiosStatic
} from 'axios';
import { persistentStorage } from 'src/shared/api/services/persistent.storage';
import { tokenManager } from '../services';

const RenewTokenOnResponseInterceptor = async (error: AxiosError) => {
  const isUnauthorized = error.response?.status === 401;

  if (isUnauthorized) {
    await tokenManager.renew();

    const config = error.config;

    if (config.headers) {
      config.headers.authorization = `Bearer ${persistentStorage.getAccessToken()}`;
    }

    return axios.request(config);
  }

  return Promise.reject(error);
};

export class HttpClientAdapter implements HttpClient {
  constructor(private axios: AxiosInstance) {
    axios.interceptors.response.use(undefined, RenewTokenOnResponseInterceptor);
  }

  async request<T>(data: HttpRequest): Promise<HttpResponse<T>> {
    try {
      const { data: response } = await this.axios.request(data);

      return response;
    } catch (error: unknown) {
      if (AxiosStatic.isAxiosError(error)) {
        throw new HttpError({
          message: error.message,
          status: (error.response?.status ?? 500)?.toString()
        });
      }

      throw new HttpError({
        message: (error as Error).message,
        status: '500'
      });
    }
  }
}
