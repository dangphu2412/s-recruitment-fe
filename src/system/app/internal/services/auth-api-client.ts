import { httpClient } from '../../../infrastructure/factories/http-client.factories';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface Tokens {
  tokens: { name: string; type: string; value: string }[];
}

export interface RenewTokensRequest {
  refreshToken: string;
}

export const authApiClient = {
  login(body: LoginRequest) {
    return httpClient.request<Tokens>({
      method: 'post',
      data: body,
      url: '/auth/login'
    });
  },
  renewTokens(refreshToken: string) {
    return httpClient.request<Tokens>({
      method: 'post',
      data: { refreshToken } as RenewTokensRequest,
      url: '/auth/tokens/renew'
    });
  },
  logout(refreshToken: string) {
    return httpClient.request<Tokens>({
      method: 'delete',
      data: { refreshToken } as RenewTokensRequest,
      url: '/auth/logout'
    });
  },
  registerByCredentials(payload: LoginRequest): Promise<Tokens> {
    return Promise.resolve({ tokens: [] });
  }
};
