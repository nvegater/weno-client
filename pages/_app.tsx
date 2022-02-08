import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/provider";
import theme from "../theme/index";
import { Box } from "@chakra-ui/react";

import { SSRCookies, SSRKeycloakProvider } from "@react-keycloak/ssr";
import { KeycloakConfig } from "keycloak-js";
import React from "react";
import "@fontsource/work-sans";
import "@fontsource/open-sans";
import "../components/DateTimePicker/DatePicker/datePicker.css";
import { initReactI18next } from "react-i18next";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import esLang from "../public/locales/es/common.json";
import enLang from "../public/locales/en/common.json";

i18next.use(initReactI18next).init({
  lng: "es",
  resources: {
    es: {
      global: esLang,
    },
    en: {
      global: enLang,
    },
  },
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

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
        <I18nextProvider i18n={i18next}>
          <Box />
          <Component {...pageProps} />
        </I18nextProvider>
      </ChakraProvider>
    </SSRKeycloakProvider>
  );
}

export default MyApp;
