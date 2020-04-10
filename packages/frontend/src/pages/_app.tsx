const fetch = require("isomorphic-unfetch");

import * as React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { customTheme } from "../chakra/theme";
import PageLayout from "../components/PageLayout";
import { GraphQLClient, ClientContext } from "graphql-hooks";
import "../styles.css";
console.log(process.env.HASURA_URL);

const client = new GraphQLClient({
  url: process.env.HASURA_URL,
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET,
  },
});

export default function App({ Component, pageProps }) {
  return (
    <ClientContext.Provider value={client}>
      <ThemeProvider theme={customTheme}>
        <CSSReset />
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ThemeProvider>
    </ClientContext.Provider>
  );
}
