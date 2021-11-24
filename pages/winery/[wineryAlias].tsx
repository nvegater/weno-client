import React from "react";
import { useRouter } from "next/router";
import useAuth from "../../components/Authentication/useAuth";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../graphql/urqlProvider";
import { Flex, Heading } from "@chakra-ui/react";
import { WenoLayout } from "../../components/GeneralLayout/WenoLayout";
import useVerifySession from "../../components/Authentication/useVerifySession";
import { WineryProfile } from "../../components/Profile/Winery/WineryProfile";

const Winery = () => {
  const router = useRouter();

  const { wineryAlias, session_id } = router.query;

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

  const { loadingVerification, verificationError, isVerified } =
    useVerifySession({
      sessionId: session_id === undefined ? null : session_id,
      contextHeader,
    });

  return (
    <WenoLayout
      authenticated={authenticated}
      loginFn={login}
      logoutFn={logout}
      tokenInfo={tokenInfo}
    >
      {!wineryAlias && <h1>Something is wrong with the Url</h1>}

      {(loadingAuthInfo || loadingVerification) && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            We are fetching the winery information....
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

      {!verificationError && isVerified && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            You have successfully subscribed!
          </Heading>
        </Flex>
      )}

      {verificationError && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            Your session is invalid
          </Heading>
        </Flex>
      )}

      {wineryAlias && authenticated && (
        <WineryProfile
          isOwner={isOwner}
          wineryAlias={wineryAlias as string}
          contextHeader={contextHeader}
          logout={logout}
        />
      )}
    </WenoLayout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Winery);
