import type { AppProps } from "next/app";
import type { Page } from "../types/types";
import React, { useContext, useEffect, useState } from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import firebase from "../demo/firebase";

import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";

import { signInWithGoogle } from "../demo/firebase";
import { IUser, createNewUserFromFirebaseUser } from "../demo/dbmodel/user";
import { ThemeSwitch } from "../demo/components/ThemeSwitch";
import { ThemeContextProvider } from "../demo/ThemeContext";

type Props = AppProps & {
  Component: Page;
};

// authenticatedUser.uid
// 'MWmy29MgUdg9J4AvUGJISNDKODq1'
// authenticatedUser.email
// 'fedevela@gmail.com'
// authenticatedUser.displayName
// 'Federico Vela'
// authenticatedUser.emailVerified
// true
// authenticatedUser.metadata
// photoURL
// auth
// displayName
// email
// emailVerified
// isAnonymous
// metadata
// phoneNumber
// photoURL
// providerData
// providerId
// refreshToken
// tenantId
// uid

export default function MusaEquationsApp({ Component, pageProps }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [firebaseUser, setFirebaseUser] = useState<firebase.User>(
    {} as firebase.User
  );
  const [localUser, setLocalUser] = useState<IUser>({} as IUser);

  const checkIsUserValid = (aFBUser: firebase.User) => {
    return (
      !aFBUser === false &&
      Object.keys(aFBUser).length > 0 &&
      !aFBUser?.uid?.length === false &&
      aFBUser?.uid?.length > 0
    );
  };

  useEffect(() => {
    console.log(JSON.stringify(firebaseUser));
  }, [firebaseUser]);

  useEffect(() => {
    //handle changes to authorization state

    /**
     * This function handles whenever the current user changes
     * @param newFirebaseUser the new firebase user that has presumably just logged in
     */
    const handleOAuthStateChanged = (newFirebaseUser: any) => {
      if (checkIsUserValid(newFirebaseUser)) {
        setIsAuthenticated(true);
        setFirebaseUser(newFirebaseUser as firebase.User);
        setLocalUser(createNewUserFromFirebaseUser(newFirebaseUser));
      } else {
        setIsAuthenticated(false);
        setFirebaseUser({} as firebase.User);
      }
    };
    firebase.auth().onAuthStateChanged(handleOAuthStateChanged);
  }, []);

  function checkIsAuthenticated(): boolean {
    return checkIsUserValid(firebaseUser) && isAuthenticated === true;
  }

  function RenderButtonSignInWithGoogle(): React.ReactNode {
    return (
      <>
        <div className="card flex justify-content-center">
          <button className="button" onClick={signInWithGoogle}>
            <i className="pi pi-google"></i> Sign in with google
          </button>
        </div>
      </>
    );
  }

  function RenderCurrentComponent(): React.ReactNode {
    return Component.getLayout ? (
      Component.getLayout(<Component {...pageProps} />)
    ) : (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    );
  }

  return (
    <>
      <ThemeContextProvider>
        <LayoutProvider>
          {checkIsAuthenticated() ? (
            <RenderCurrentComponent />
          ) : (
            <RenderButtonSignInWithGoogle />
          )}
          test 0818
          <ThemeSwitch></ThemeSwitch>
        </LayoutProvider>
      </ThemeContextProvider>
    </>
  );
}
