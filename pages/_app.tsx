import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";

import client from "utils/apolloClient";
import Layout from "../components/layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ApolloProvider>
  );
}
