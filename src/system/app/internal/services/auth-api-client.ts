import { ApiClient } from 'src/system/app/internal/services/index';
import {
  BrowserStorage,
  registerBrowserStorage
} from 'src/system/app/internal/services/index';

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
    return ApiClient.post<Tokens, LoginRequest>('/auth/login', body);
  },
  renewTokens() {
    registerBrowserStorage();
    const refreshToken = BrowserStorage.get('refreshToken') ?? '';
    return ApiClient.post<Tokens, RenewTokensRequest>('/auth/tokens/renew', {
      refreshToken
    });
  },
  logout() {
    registerBrowserStorage();
    const refreshToken = BrowserStorage.get('refreshToken') ?? '';
    return ApiClient.delete<void, RenewTokensRequest>('/auth/logout', {
      data: {
        refreshToken
      }
    });
  },
  registerByCredentials(payload: LoginRequest): Promise<Tokens> {
    return Promise.resolve({ tokens: [] });
  }
};
