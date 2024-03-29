import React from "react";
import { dedupExchange, Exchange, fetchExchange } from "urql";
import { NextUrqlClientConfig, SSRExchange } from "next-urql";
//import { cacheExchange } from "@urql/exchange-graphcache";

// This will eventually run on the Server as well.
export const createUrqlClient: NextUrqlClientConfig = (
  ssrExchange: SSRExchange
) => {
  const castedExchanges: Exchange[] = [
    //Needed because [Exchange, Exchange] not the Same as Exchange[].. duh
    dedupExchange,
    //cacheExchange(cacheUpdates),
    ssrExchange,
    fetchExchange,
  ];
  return {
    url: process.env.NEXT_PUBLIC_API_URL as string,
    fetchOptions: {
      credentials: "include",
    },
    exchanges: castedExchanges,
  } as const;
};
