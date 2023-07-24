import type { AppProps } from "next/app";
import type { Page } from "../types/types";
import React, { useRef } from "react";
import { Toast } from "primereact/toast";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";

import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";

import { ThemeContextProvider } from "../demo/context/ThemeContext";
import { ContextProviderMessagesToast } from "../demo/context/ContextMessagesToast";
import { ContextProviderAuthenticatedUser } from "../demo/context/ContextAuthenticatedUser";
import { InterceptAuthentication } from "../demo/components/InterceptAuthentication";

type Props = AppProps & {
  Component: Page;
};

export default function MusaEquationsApp({ Component, pageProps }: Props) {
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
      <ContextProviderMessagesToast>
        <ContextProviderAuthenticatedUser>
          <ThemeContextProvider>
            <LayoutProvider>
              <InterceptAuthentication>
                <RenderCurrentComponent />
              </InterceptAuthentication>
              {/* test 0818
            <ThemeSwitch></ThemeSwitch> */}
            </LayoutProvider>
          </ThemeContextProvider>
        </ContextProviderAuthenticatedUser>
      </ContextProviderMessagesToast>
    </>
  );
}
