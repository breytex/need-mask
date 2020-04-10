import * as React from "react";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { customTheme } from "../chakra/theme";
import PageLayout from "../components/PageLayout";

import "../styles.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={customTheme}>
      <CSSReset />
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ThemeProvider>
  );
}
