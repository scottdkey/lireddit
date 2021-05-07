
import { CSSReset, ThemeProvider } from "@chakra-ui/react";
import React from "react";
import { Provider, createClient } from "urql";
import theme from "../theme";

const client = createClient({ url: "http://localhost:4000/graphql" })

function MyApp({ Component, pageProps }: any) {

  return (
    <Provider value={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
