import React from "react";
import { useRouter } from "next/router";
import { useWineryQuery } from "../../graphql/generated/graphql";
import useAuth from "../../components/Authentication/useAuth";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../graphql/urqlProvider";
import { Flex, Heading } from "@chakra-ui/react";
import { WenoLayout } from "../../components/GeneralLayout/WenoLayout";
import useVerifySession from "../../components/Authentication/useVerifySession";

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
    authenticated,
    logout,
    login,
    tokenInfo,
    isOwner,
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

  // http://localhost:3000/winery/wineryAlias?session_id=cs_test_b1BRjVbQsImZAEqMJiQENGFPrEvkeOelYHoH2bfjMsIJCU0ivFtmxAknnR
  const sessionID: string | null = router.query.session_id
    ? (router.query.session_id as string)
    : null;

  const { loadingVerification, verificationError, isVerified } =
    useVerifySession({ sessionId: sessionID, contextHeader });

  return (
    <WenoLayout
      authenticated={authenticated}
      loginFn={login}
      logoutFn={logout}
      tokenInfo={tokenInfo}
    >
      {!wineryAlias && <h1>Something is wrong with the Url</h1>}

      {(loadingAuthInfo || fetchingWinery || loadingVerification) && (
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

      {wineryAlias && wineryQuery && wineryQuery.winery.errors && (
        <h1>
          {wineryQuery.winery.errors[0].field}:{" "}
          {wineryQuery.winery.errors[0].message}
        </h1>
      )}

      {!verificationError && isVerified && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            You have successfully subscribed!
          </Heading>
        </Flex>
      )}
      {wineryAlias && wineryQuery && wineryQuery.winery.winery && (
        <h1>
          Your winery is {wineryQuery.winery.winery.name} and you are{" "}
          {isOwner ? "the owner" : "just visiting"}
        </h1>
      )}
    </WenoLayout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Winery);
