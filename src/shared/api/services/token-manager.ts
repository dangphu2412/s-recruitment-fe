import { authApiClient, Tokens } from '../../../entities/auth/api';
import { persistentStorage } from './persistent.storage';

let renewHandler: Promise<Tokens> | undefined;

export const tokenManager = {
  clean(): void {
    persistentStorage.cleanStorage();
  },
  async renew(): Promise<void> {
    if (!renewHandler) {
      const refreshToken = persistentStorage.getRefreshToken();

      if (!refreshToken) return;

      renewHandler = authApiClient.renewTokens(refreshToken);
    }

    const tokens: Tokens = await renewHandler;

    persistentStorage.saveTokens(tokens);

    if (renewHandler) {
      renewHandler = undefined;
    }
  }
};
