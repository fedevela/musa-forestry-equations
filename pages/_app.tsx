import type { AppProps } from "next/app";
import type { Page } from "../types/types";
import React, { useState } from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";

import { SelectButton, SelectButtonChangeEvent } from "primereact/selectbutton";

type Props = AppProps & {
  Component: Page;
};

const optionsTrueFalse: string[] = ["true", "false"];

export default function MyApp({ Component, pageProps }: Props) {
  const [isTrueFalse, setIsTrueFalse] = useState<string>(optionsTrueFalse[1]);

  function isAuthenticated(): boolean {
    return isTrueFalse === optionsTrueFalse[0];
  }

  function BasicDemo() {
    return (
      <>
        <div className="card flex justify-content-center">
          <SelectButton
            value={isTrueFalse}
            onChange={(e: SelectButtonChangeEvent) => setIsTrueFalse(e.value)}
            options={optionsTrueFalse}
          />
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
        {isAuthenticated() ? renderCurrentComponent() : <BasicDemo></BasicDemo>}
      </LayoutProvider>
    </>
  );
}
