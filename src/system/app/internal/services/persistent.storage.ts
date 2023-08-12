import { PersistentStorage } from 'src/system/domain/usecases/persistent-storage';

const AUTHENTICATION_KEY = 'accessToken';

export const persistentStorage: PersistentStorage = {
  getAccessToken(): string | null {
    return window.localStorage.getItem(AUTHENTICATION_KEY);
  },
  setAccessToken(accessToken: string): void {
    window.localStorage.setItem(AUTHENTICATION_KEY, accessToken);
  },
  cleanStorage(): void {
    window.localStorage.removeItem(AUTHENTICATION_KEY);
  }
};
