import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/provider";
import theme from "../theme/index";
import Fonts from "../theme/fonts/Fonts";

import { SSRCookies, SSRKeycloakProvider } from "@react-keycloak/ssr";
import { KeycloakConfig } from "keycloak-js";
import React from "react";

import "../components/DateTimePicker/Clock.css";
import "../components/DateTimePicker/DateTimePicker.css";
import "../components/DateTimePicker/Calendar.css";

interface InitialProps {
  cookies: unknown;
}

const keycloakCfg: KeycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_SERVER_URL,
  realm: "Weno-Realm",
  clientId: "weno-frontend",
};

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const keycloakConfig = {
    persistor: SSRCookies(cookies),
    keycloakConfig: keycloakCfg,
  };

  // https://github.com/react-keycloak/react-keycloak/blob/master/packages/ssr/README.md
  return (
    <SSRKeycloakProvider {...keycloakConfig}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Component {...pageProps} />
      </ChakraProvider>
    </SSRKeycloakProvider>
  );
}

export default MyApp;
