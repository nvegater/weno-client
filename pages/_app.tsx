import "../styles/globals.css";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/provider";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { inProd } from "./prodCheck";

import theme from "../theme/index";
import Fonts from "../theme/fonts/Fonts";

function MyApp({ Component, pageProps }: AppProps) {
  const paypalClientId = !!process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    ? process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
    : "errorClientId";
  const initialOptions = {
    "client-id": inProd ? paypalClientId : "sb", // sandbox in dev move
    currency: "MXN",
    intent: "capture", // dont authorize the order unless money is sent $$ (we dont care about promises)
  };
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <PayPalScriptProvider options={initialOptions}>
        <Component {...pageProps} />
      </PayPalScriptProvider>
    </ChakraProvider>
  );
}

export default MyApp;
