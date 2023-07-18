export interface IUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  providerId: string;
  providerUID: string;
  refreshToken: string;
  accessToken: string;
  tokenExpirationTime: Date;
  createdAt: Date;
  lastLoginAt: Date;
  apiKey: string;
  appName: string;
}
