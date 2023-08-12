import { Tokens } from '../../app/internal/services/auth-api-client';

export interface PersistentStorage {
  getAccessToken(): string | null;
  getRefreshToken(): string | null;
  setAccessToken(accessToken: string): void;
  setRefreshToken(refreshToken: string): void;
  saveTokens(tokens: Tokens): void;
  cleanStorage(): void;
}
