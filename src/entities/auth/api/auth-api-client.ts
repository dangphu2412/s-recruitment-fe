import { httpClient } from '../../../shared/api';

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

export type UpdateMyPasswordPayload = {
  currentPassword: string;
  newPassword: string;
};

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
  updateMyPassword(payload: UpdateMyPasswordPayload) {
    return httpClient.request<Tokens>({
      method: 'post',
      data: payload,
      url: '/auth/password'
    });
  }
};
