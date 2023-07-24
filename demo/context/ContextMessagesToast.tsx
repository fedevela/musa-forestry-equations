import { Toast } from "primereact/toast";
import { PropsWithChildren, createContext, useContext, useRef } from "react";

type ContextTypeMessagesToast = {
  showSuccess: (summary: string, detail: string) => void;
  showInfo: (summary: string, detail: string) => void;
  showWarn: (summary: string, detail: string) => void;
  showError: (summary: string, detail: string) => void;
};

export const ContextMessagesToast = createContext<
  ContextTypeMessagesToast | undefined
>(undefined);

export const ContextProviderMessagesToast = ({ children }: PropsWithChildren<{}>) => {
  const messagesToast = useRef<Toast>(null);

  const showSuccess = (summary: string, detail: string) => {
    messagesToast.current?.show({
      severity: "success",
      summary,
      detail,
    });
  };

  const showInfo = (summary: string, detail: string) => {
    messagesToast.current?.show({
      severity: "info",
      summary,
      detail,
    });
  };

  const showWarn = (summary: string, detail: string) => {
    messagesToast.current?.show({
      severity: "warn",
      summary,
      detail,
    });
  };

  const showError = (summary: string, detail: string) => {
    messagesToast.current?.show({
      severity: "error",
      summary,
      detail,
    });
  };
  return (
    <>
      <Toast ref={messagesToast} />
      <ContextMessagesToast.Provider
        value={{ showSuccess, showInfo, showWarn, showError }}
      >
        {children}
      </ContextMessagesToast.Provider>
    </>
  );
};

export const useContextMessagesToast = () => {
  const context = useContext(ContextMessagesToast);

  if (!context) {
    throw new Error(
      "useContextMessagesToast must be used inside the ContextMessagesToast.Provider"
    );
  }

  return context;
};
