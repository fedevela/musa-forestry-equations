import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../dbmodel/user";
import { ContextMessagesToast } from "./ContextMessagesToast";

type ContextTypeAuthenticatedUser = {
  authenticatedUser: IUser;
  setAuthenticatedUser: (aUser: IUser) => void;
};

export const ContextAuthenticatedUser = createContext<
  ContextTypeAuthenticatedUser | undefined
>(undefined);

export const ContextProviderAuthenticatedUser = ({
  children,
}: PropsWithChildren<{}>) => {
  const contextMessagesToast = useContext(ContextMessagesToast);

  const [authenticatedUser, setAuthenticatedUser] = useState<
    ContextTypeAuthenticatedUser["authenticatedUser"]
  >({} as IUser);

  const setAuthenticatedUserExecute = (aUser: IUser) => {
    setAuthenticatedUser(aUser);
  };

  useEffect(() => {
    if (
      !authenticatedUser === false &&
      !authenticatedUser.email === false &&
      !authenticatedUser.displayName === false
    )
      contextMessagesToast?.showSuccess(
        "Login Successful: " + authenticatedUser.email,
        "Welcome " + authenticatedUser.displayName
      );
  }, [authenticatedUser, contextMessagesToast]);

  return (
    <ContextAuthenticatedUser.Provider
      value={{
        authenticatedUser,
        setAuthenticatedUser: setAuthenticatedUserExecute,
      }}
    >
      {children}
    </ContextAuthenticatedUser.Provider>
  );
};

export const useContextAuthenticatedUser = () => {
  const aContext = useContext(ContextAuthenticatedUser);

  if (!aContext) {
    throw new Error(
      "useContextAuthenticatedUser must be used inside the ContextProviderAuthenticatedUser"
    );
  }

  return aContext;
};
