import { AppType } from "next/app";
import theme from "../theme";
import superjson from "superjson";
import { withTRPC } from "@trpc/next";
import { AppRouter } from "../server/router";
import { ChakraProvider } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";

import React from "react";
import "@fontsource/work-sans";
import "@fontsource/open-sans";
import "../components/DateTimePicker/DatePicker/datePicker.css";
import { I18nextProvider, initReactI18next } from "react-i18next";
import i18next from "i18next";
import esLang from "../../public/locales/es/common.json";
import enLang from "../../public/locales/en/common.json";
import "@fullcalendar/common/main.css";
import "@fullcalendar/daygrid/main.css";
import "@fullcalendar/timegrid/main.css";

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

const MyApp: AppType = ({
  Component,
  // @ts-ignore TODO find out why
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ChakraProvider theme={theme}>
        <I18nextProvider i18n={i18next}>
          <Component {...pageProps} />
        </I18nextProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

const getBaseUrl = () => {
  if (typeof window !== "undefined") {
    return "";
  }
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`; // SSR should use vercel url

  return `http://localhost:${process.env.PORT ?? 3000}`; // dev SSR should use localhost
};
export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
