import { useEffect, useState } from "react";
import firebase from "../firebase";
import { ChildContainerProps } from "../../types/types";
import { RenderButtonSignInWithGoogle } from "./RenderButtonSignInWithGoogle";

export const InterceptAuthentication = ({
  children,
}: ChildContainerProps): React.ReactNode => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [firebaseUser, setFirebaseUser] = useState<firebase.User>(
    {} as firebase.User
  );

  function checkIsAuthenticated(): boolean {
    return checkIsUserValid(firebaseUser) && isAuthenticated === true;
  }

  const checkIsUserValid = (aFBUser: firebase.User) => {
    return (
      !aFBUser === false &&
      Object.keys(aFBUser).length > 0 &&
      !aFBUser?.uid?.length === false &&
      aFBUser?.uid?.length > 0
    );
  };

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
      } else {
        setIsAuthenticated(false);
        setFirebaseUser({} as firebase.User);
      }
    };
    firebase.auth().onAuthStateChanged(handleOAuthStateChanged);
  }, []);

  return (
    <>
      <div className="card flex justify-content-center">
        {checkIsAuthenticated() ? children : <RenderButtonSignInWithGoogle />}
      </div>
    </>
  );
};
