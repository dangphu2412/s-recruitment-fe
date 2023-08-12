import { PersistentStorage } from 'src/system/domain/usecases/persistent-storage';
import { Tokens } from './auth-api-client';

const AUTHENTICATION_KEY = 'accessToken';
const REFRESH_TOKEN_KEY = 'refreshToken';

export const persistentStorage: PersistentStorage = {
  saveTokens(tokens: Tokens): void {
    tokens.tokens.forEach(token => {
      window.localStorage.setItem(token.name, token.value);
    });
  },
  getAccessToken(): string | null {
    return window.localStorage.getItem(AUTHENTICATION_KEY);
  },
  getRefreshToken(): string | null {
    return window.localStorage.getItem(REFRESH_TOKEN_KEY);
  },
  setAccessToken(accessToken: string): void {
    window.localStorage.setItem(AUTHENTICATION_KEY, accessToken);
  },
  setRefreshToken(refreshToken: string): void {
    window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  },
  cleanStorage(): void {
    window.localStorage.removeItem(AUTHENTICATION_KEY);
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  }
};
