import type { AppProps } from "next/app";
import type { Page } from "../types/types";
import React, { useEffect, useState } from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import firebase from "../demo/firebase";

import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";

import { signInWithGoogle } from "../demo/firebase";
import User from "../demo/firebase_dto/User";

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

export default function MyApp({ Component, pageProps }: Props) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [firebaseUser, setFirebaseUser] = useState<firebase.User>(
    {} as firebase.User
  );

  async function executeFirebaseAuthStateChanged(
    newFirebaseUser: firebase.User
  ) {
    {
      setFirebaseUser(newFirebaseUser as firebase.User);
    }
  }

  const checkIsUserValid = (aFBUser: firebase.User) =>
    !aFBUser === false &&
    Object.keys(aFBUser as Object).length > 0 &&
    aFBUser.uid.length > 0;

  //first global effect
  useEffect(() => {
    //handle changes to authorization state
    firebase.auth().onAuthStateChanged((firebaseUser: any) => {
      executeFirebaseAuthStateChanged(firebaseUser);
    });
  }, []);

  //effect when firebase user changed
  useEffect(() => {
    if (checkIsUserValid(firebaseUser)) {
      //user is defined
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [firebaseUser]);

  function checkIsAuthenticated(): boolean {
    return checkIsUserValid(firebaseUser) && isAuthenticated === true;
  }

  function BasicSelectButtonDemo() {
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

  function renderCurrentComponent(): React.ReactNode {
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
      <LayoutProvider>
        {checkIsAuthenticated() ? (
          renderCurrentComponent()
        ) : (
          <BasicSelectButtonDemo></BasicSelectButtonDemo>
        )}
      </LayoutProvider>
    </>
  );
}
