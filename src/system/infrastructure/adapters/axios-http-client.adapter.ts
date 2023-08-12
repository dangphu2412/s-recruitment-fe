import {
  HttpClient,
  HttpError,
  HttpRequest,
  HttpResponse
} from 'src/system/app/external/http-client';
import { AxiosInstance, default as AxiosStatic } from 'axios';

export class HttpClientAdapter implements HttpClient {
  constructor(private axios: AxiosInstance) {}

  async request<T>(data: HttpRequest): Promise<HttpResponse<T>> {
    try {
      const { data: response } = await this.axios.request(data);

      return response;
    } catch (error: unknown) {
      if (AxiosStatic.isAxiosError(error)) {
        throw new HttpError(error.message, String(error.status));
      }

      throw error;
    }
  }
}
