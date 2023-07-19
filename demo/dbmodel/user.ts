import firebase from "../firebase";

export interface IUser {
  uid: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  isAnonymous: boolean;
  photoURL: string;
  tokenExpirationTime: Date;
  createdAt: Date;
  lastLoginAt: Date;
  type: string;
}

export function createNewUserFromFirebaseUser(fbuser: firebase.User): IUser {
  const newUser: IUser = {
    uid: fbuser.uid,
    email: !fbuser.email ? "" : fbuser.email,
    emailVerified: fbuser.emailVerified,
    displayName: !fbuser.displayName ? "" : fbuser.displayName,
    isAnonymous: fbuser.isAnonymous,
    photoURL: !fbuser.photoURL ? "" : fbuser.photoURL,
    tokenExpirationTime: new Date(),
    createdAt: new Date(),
    lastLoginAt: new Date(),
    type: "IUser",
  };
  return newUser;
}

export function isAnIUser(obj: any): obj is IUser {
  return "type" in obj && obj.type === "IUser";
}
