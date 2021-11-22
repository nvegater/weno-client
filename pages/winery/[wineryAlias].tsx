import React from "react";
import { useRouter } from "next/router";
import { useWineryQuery } from "../../graphql/generated/graphql";
import useAuth from "../../components/Authentication/useAuth";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../graphql/urqlProvider";
import { Flex, Heading } from "@chakra-ui/react";

const Winery = () => {
  const router = useRouter();

  const wineryAlias =
    typeof router.query.wineryAlias === "string"
      ? router.query.wineryAlias
      : null;

  const {
    loading: loadingAuthInfo,
    notAuthenticated,
    contextHeader,
  } = useAuth();

  const [
    { data: wineryQuery, error: errorFetchingWinery, fetching: fetchingWinery },
  ] = useWineryQuery({
    variables: {
      getWineryInputs: { urlAlias: wineryAlias },
    },
    context: contextHeader,
    pause: loadingAuthInfo || notAuthenticated,
    requestPolicy: "network-only",
  });
  // TODO Verify Checkout Session ID after redirect

  return (
    <>
      {!wineryAlias && <h1>Something is wrong with the Url</h1>}

      {(loadingAuthInfo || fetchingWinery) && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            We are fetching the winery information....
          </Heading>
        </Flex>
      )}

      {errorFetchingWinery && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            Error Fetching Winery
          </Heading>
        </Flex>
      )}

      {notAuthenticated && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            Login to see the winery information
          </Heading>
        </Flex>
      )}

      {wineryAlias && wineryQuery && (
        <h1>Your winery is {wineryQuery.winery.winery.name}</h1>
      )}
    </>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Winery);
