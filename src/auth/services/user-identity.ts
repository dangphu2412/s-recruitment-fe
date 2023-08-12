import {
  BrowserStorage,
  registerBrowserStorage
} from 'src/shared/services/browser-storage';

export const UserIdentity = {
  isAuthenticated(): boolean {
    if (typeof window !== 'undefined') {
      registerBrowserStorage('localStorage');

      return !!BrowserStorage.get('accessToken');
    }

    return false;
  }
};
