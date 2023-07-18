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

// import User from "../demo/firebase_dto/User";
// import {
//   addDoc,
//   collection,
//   setDoc,
//   deleteDoc,
//   doc,
//   query,
//   onSnapshot,
// } from "firebase/firestore";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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
  // const [info, setInfo] = useState<any[]>([]);
  // const [isUpdate, setisUpdate] = useState(false);
  // const [docId, setdocId] = useState("");
  // const [detail, setDetail] = useState("");
  // const [ids, setIds] = useState<string[]>([]);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [firebaseUser, setFirebaseUser] = useState<firebase.User>(
    {} as firebase.User
  );

  const checkIsUserValid = (aFBUser: firebase.User) => {
    debugger;
    return (
      !aFBUser === false &&
      Object.keys(aFBUser).length > 0 &&
      !aFBUser?.uid?.length === false &&
      aFBUser?.uid?.length > 0
    );
  };

  // const getData = async (firebaseUser: firebase.User) => {
  //   const data = await query(
  //     firebase
  //       .firestore()
  //       .collection("test-collection")
  //       .where("userIds", "array-contains", firebaseUser.uid)
  //   );

  //   onSnapshot(data, (querySnapshot) => {
  //     const databaseInfo: any[] = [];
  //     const dataIds: string[] = [];

  //     querySnapshot.forEach((doc) => {
  //       databaseInfo.push(doc.data().testData);
  //       dataIds.push(doc.id as string);
  //     });

  //     setIds(dataIds);
  //     setInfo(databaseInfo);
  //   });
  // };

  useEffect(() => {
    //handle changes to authorization state
    firebase.auth().onAuthStateChanged((newFirebaseUser: any) => {
      console.log(newFirebaseUser.email);
      if (checkIsUserValid(newFirebaseUser)) {
        console.log(newFirebaseUser.email);
        setIsAuthenticated(true);
        setFirebaseUser(newFirebaseUser as firebase.User);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  function checkIsAuthenticated(): boolean {
    debugger;
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
      <LayoutProvider>
        {checkIsAuthenticated() ? (
          <RenderCurrentComponent />
        ) : (
          <RenderButtonSignInWithGoogle />
        )}
      </LayoutProvider>
    </>
  );
}
