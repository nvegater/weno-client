import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/provider";
import theme from "../theme/index";
import Fonts from "../theme/fonts/Fonts";

import { SSRCookies, SSRKeycloakProvider } from "@react-keycloak/ssr";
import { KeycloakConfig } from "keycloak-js";
import React from "react";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import esLang from "../public/locales/es/common.json";
import enLang from "../public/locales/en/common.json";

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

i18next.init({
  interpolation: { escapeValue: false },
  lng: "es",
  resources: {
    es: {
      global: esLang,
    },
    en: {
      global: enLang,
    },
  },
});

function MyApp({ Component, pageProps, cookies }: AppProps & InitialProps) {
  const keycloakConfig = {
    persistor: SSRCookies(cookies),
    keycloakConfig: keycloakCfg,
  };

  // https://github.com/react-keycloak/react-keycloak/blob/master/packages/ssr/README.md
  return (
    <SSRKeycloakProvider {...keycloakConfig}>
      <ChakraProvider theme={theme}>
        <I18nextProvider i18n={i18next}>
          <Fonts />
          <Component {...pageProps} />
        </I18nextProvider>
      </ChakraProvider>
    </SSRKeycloakProvider>
  );
}

export default MyApp;
