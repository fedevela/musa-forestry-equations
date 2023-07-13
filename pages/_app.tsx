import type { AppProps } from "next/app";
import type { Page } from "../types/types";
import React from "react";
import { LayoutProvider } from "../layout/context/layoutcontext";
import Layout from "../layout/layout";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "../styles/layout/layout.scss";
import "../styles/demo/Demos.scss";

type Props = AppProps & {
  Component: Page;
};

export default function MyApp({ Component, pageProps }: Props) {
  return (
    <LayoutProvider>
      {Component.getLayout ? (
        Component.getLayout(<Component {...pageProps} />)
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </LayoutProvider>
  );
}
