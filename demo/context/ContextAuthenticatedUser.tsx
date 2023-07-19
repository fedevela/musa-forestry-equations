import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { IUser } from "../dbmodel/user";

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
  const [authenticatedUser, setAuthenticatedUser] = useState<
    ContextTypeAuthenticatedUser["authenticatedUser"]
  >({} as IUser);

  return (
    <ContextAuthenticatedUser.Provider
      value={{ authenticatedUser, setAuthenticatedUser }}
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
