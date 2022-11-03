import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { TokenManager } from '@modules/shared/services/token-manager';
import { ClientErrorCode } from '@modules/error-handling/client-code';
import { ClientError } from '@modules/error-handling/useErrorHandler';
import { BrowserStorage } from './browser-storage';

const API_URL = process.env.NEXT_PUBLIC_API_ENDPOINT ?? 'http://localhost:8080';

axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 10000;
axios.interceptors.request.use(config => {
  if (config.headers) {
    config.headers.authorization =
      `Bearer ${BrowserStorage.get('accessToken')}` ?? '';
  }
  return config;
});

axios.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const isUnauthorized =
      (error.response?.data as ClientError)?.errorCode ===
      ClientErrorCode.UNAUTHORIZED;

    if (isUnauthorized) {
      await TokenManager.renew();
      return axios.request(error.config);
    }

    return Promise.reject(error);
  }
);

export type ClientRequestConfig<D> = AxiosRequestConfig<D>;

export const ApiClient = {
  async get<T = any, D = any>(
    url: string,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await axios.get<T, AxiosResponse<T>, D>(url, config);
    return response.data;
  },
  async post<T = any, D = any>(
    url: string,
    body?: D,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await axios.post<T, AxiosResponse<T>, D>(
      url,
      body,
      config
    );
    return response.data;
  },
  async put<T = any, D = any>(
    url: string,
    body: D,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await axios.put<T, AxiosResponse<T>, D>(url, body, config);
    return response.data;
  },
  async patch<T = any, D = any>(
    url: string,
    body?: D,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await axios.patch<T, AxiosResponse<T>, D>(
      url,
      body,
      config
    );
    return response.data;
  },
  async delete<T = any, D = any>(
    url: string,
    config?: ClientRequestConfig<D>
  ): Promise<T> {
    const response = await axios.delete<T, AxiosResponse<T>, D>(url, config);
    return response.data;
  }
};
