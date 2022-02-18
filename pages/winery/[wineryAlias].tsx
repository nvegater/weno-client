import React from "react";
import { useRouter } from "next/router";
import useAuth from "../../components/Authentication/useAuth";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../graphql/urqlProvider";
import { Flex, Heading, Link } from "@chakra-ui/react";
import { WenoLayout } from "../../components/GeneralLayout/WenoLayout";
import useVerifySession from "../../components/Authentication/useVerifySession";
import { WineryProfile } from "../../components/Winery/WineryProfile";
import { useTranslation } from "react-i18next";

const Winery = () => {
  const router = useRouter();
  const [t] = useTranslation("global");
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
    urlAlias,
  } = useAuth();

  const {
    loadingVerification,
    verificationError,
    isVerified,
    retryVerificationLink,
  } = useVerifySession({
    sessionId: session_id === undefined ? null : session_id,
  });

  return (
    <WenoLayout
      authenticated={authenticated}
      loginFn={login}
      logoutFn={logout}
      tokenInfo={tokenInfo}
      urlAlias={urlAlias}
    >
      {!wineryAlias && <h1>{t("urlError")}</h1>}

      {(loadingAuthInfo || loadingVerification) && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            {t("fetchingInformation")}
          </Heading>
        </Flex>
      )}

      {notAuthenticated && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            {t("needToLogin")}
          </Heading>
        </Flex>
      )}

      {!verificationError && isVerified && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            {t("subscribed")}
          </Heading>
        </Flex>
      )}

      {verificationError && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            {t("invalidSession")}
          </Heading>
        </Flex>
      )}

      {retryVerificationLink && (
        <Heading>
          {t("incompleteBooking")}
          <Link href={retryVerificationLink}>here</Link>
        </Heading>
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
  ssr: false,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Winery);
