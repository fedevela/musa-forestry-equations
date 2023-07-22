import { useEffect, useState } from "react";
import firebase from "../firebase";
import { ChildContainerProps } from "../../types/types";
import { RenderButtonSignInWithGoogle } from "./RenderButtonSignInWithGoogle";
import { useContextAuthenticatedUser } from "../context/ContextAuthenticatedUser";
import { createNewUserFromFirebaseUser } from "../dbmodel/user";
import axios from "axios";

export const InterceptAuthentication = ({
  children,
}: ChildContainerProps): React.ReactNode => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [firebaseUser, setFirebaseUser] = useState<firebase.User>(
    {} as firebase.User
  );
  const { setAuthenticatedUser } = useContextAuthenticatedUser();

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
      // no changes
      if (newFirebaseUser === firebaseUser) return;

      //user did change
      if (checkIsUserValid(newFirebaseUser)) {
        const aUserURL = `/api/users?uid=${newFirebaseUser.uid}`;
        const newLocalUser = createNewUserFromFirebaseUser(newFirebaseUser);

        //check if user with same id exists in database if so update, else create
        axios
          .get(aUserURL, {})
          .then((response: any) => {
            if (!response.data[0] === true) {
              //not defined, create a new one
              axios.post(aUserURL, newLocalUser);
            } else {
              // is defined, update
              axios.put(aUserURL, newLocalUser);
            }
            setIsAuthenticated(true);
            setFirebaseUser(newFirebaseUser as firebase.User);
            setAuthenticatedUser(
              createNewUserFromFirebaseUser(newFirebaseUser)
            );
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setIsAuthenticated(false);
        setFirebaseUser({} as firebase.User);
      }
    };
    firebase.auth().onAuthStateChanged(handleOAuthStateChanged);
  }, [firebaseUser, setAuthenticatedUser]);

  return (
    <>
      <div className="card flex justify-content-center">
        {checkIsAuthenticated() ? children : <RenderButtonSignInWithGoogle />}
      </div>
    </>
  );
};
