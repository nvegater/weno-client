import React from "react";
import { dedupExchange, Exchange, fetchExchange } from "urql";
//import { cacheExchange } from "@urql/exchange-graphcache";
import { NextUrqlClientConfig, SSRExchange } from "next-urql/dist/types/types";
import { NextPageContext } from "next";
import cookie from "cookie";
import { IncomingMessage } from "http";

function parseCookies(req?: IncomingMessage) {
  if (!req || !req.headers) {
    return {};
  }
  return cookie.parse(req.headers.cookie || "");
}

// This will eventually run on the Server as well.
export const createUrqlClient: NextUrqlClientConfig = (
  ssrExchange: SSRExchange,
  ctx: NextPageContext | undefined
) => {
  const cookies = ctx && ctx.req ? parseCookies(ctx.req) : undefined;

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
      credentials: "include" as const,
      headers: cookies !== undefined ? { cookies } : undefined,
    },
    exchanges: castedExchanges,
  } as const;
};
