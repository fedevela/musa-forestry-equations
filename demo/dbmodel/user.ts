import firebase from "../firebase";

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

export function createNewUserFromFirebaseUser(fbuser: firebase.User): IUser {
  const newUser: IUser = {
    uid: fbuser.uid,
    email: !fbuser.email ? "" : fbuser.email,
    emailVerified: fbuser.emailVerified,
    displayName: !fbuser.displayName ? "" : fbuser.displayName,
    isAnonymous: fbuser.isAnonymous,
    photoURL: !fbuser.photoURL ? "" : fbuser.photoURL,
    providerId: !fbuser.providerId ? "" : fbuser.providerId,
    //fix below
    providerUID: !fbuser.providerId ? "" : fbuser.providerId,
    refreshToken: !fbuser.refreshToken ? "" : fbuser.refreshToken,
    accessToken: !fbuser.refreshToken ? "" : fbuser.refreshToken,
    tokenExpirationTime: new Date(),
    createdAt: new Date(),
    lastLoginAt: new Date(),
    apiKey: !fbuser.refreshToken ? "" : fbuser.refreshToken,
    appName: !fbuser.refreshToken ? "" : fbuser.refreshToken,
  };
  return newUser;
}
