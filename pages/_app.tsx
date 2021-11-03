import { AppContext, AppProps } from "next/app";
import type { IncomingMessage } from "http";
import cookie from "cookie";
import { ChakraProvider } from "@chakra-ui/provider";
import theme from "../theme/index";
import Fonts from "../theme/fonts/Fonts";

import { SSRCookies, SSRKeycloakProvider } from "@react-keycloak/ssr";
import { KeycloakConfig } from "keycloak-js";
import React from "react";

interface InitialProps {
  cookies: unknown;
  host: string;
}

const keycloakCfg: KeycloakConfig = {
  url: process.env.NEXT_PUBLIC_KEYCLOAK_SERVER_URL,
  realm: "Weno-Realm",
  clientId: "weno-frontend",
};

function MyApp({
  Component,
  pageProps,
  cookies,
}: //host,
AppProps & InitialProps) {
  const keycloakConfig = {
    persistor: SSRCookies(cookies),
    keycloakConfig: keycloakCfg,
    LoadingComponent: <div>Loading</div>,
    /*  initOptions: {
      //onLoad: "login-required",
      /!*onLoad: "check-sso",
      silentCheckSsoRedirectUri: host + "/silent-check-sso.html",
      pkceMethod: "S256",*!/
    },*/
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

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
}

MyApp.getInitialProps = async (context: AppContext) => {
  // Extract cookies from AppContext
  const { ctx } = context;
  const cookies = parseCookies(ctx.req);
  return {
    cookies: cookies,
    // https://stackoverflow.com/questions/65199051/how-to-get-page-url-or-hostname-in-nextjs-project
    host: ctx.req.headers.host,
  };
};

export default MyApp;
