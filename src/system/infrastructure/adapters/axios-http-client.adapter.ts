import {
  ClientError,
  HttpClient,
  HttpError,
  HttpRequest,
  HttpResponse
} from 'src/system/app/external/http-client';
import axios, {
  AxiosError,
  AxiosInstance,
  default as AxiosStatic
} from 'axios';
import { tokenManager } from '../../app/internal/services';
import { ClientErrorCode } from '../../domain/constants/client-code';

const RenewTokenOnResponseInterceptor = async (error: AxiosError) => {
  const isUnauthorized =
    (error.response?.data as ClientError)?.errorCode ===
    ClientErrorCode.UNAUTHORIZED;

  if (isUnauthorized) {
    await tokenManager.renew();
    return axios.request(error.config);
  }

  return Promise.reject(error);
};

export class HttpClientAdapter implements HttpClient {
  constructor(private axios: AxiosInstance) {
    axios.interceptors.response.use(
      res => res,
      RenewTokenOnResponseInterceptor
    );
  }

  async request<T>(data: HttpRequest): Promise<HttpResponse<T>> {
    try {
      const { data: response } = await this.axios.request(data);

      return response;
    } catch (error: unknown) {
      if (AxiosStatic.isAxiosError(error)) {
        throw new HttpError({
          message: error.message,
          status: error.status ?? '500',
          code: (error.response?.data as ClientError)?.errorCode ?? ''
        });
      }

      throw error;
    }
  }
}
