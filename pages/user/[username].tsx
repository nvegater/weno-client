import React from "react";
import { useRouter } from "next/router";
import useAuth from "../../components/Authentication/useAuth";
import { WenoLayout } from "../../components/GeneralLayout/WenoLayout";
import { Flex, Heading } from "@chakra-ui/react";
import { UserProfile } from "../../components/Customer/UserProfile";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../graphql/urqlProvider";
import { useTranslation } from "react-i18next";

const User = () => {
  const router = useRouter();
  const { username } = router.query;
  const [t] = useTranslation("global");
  const {
    loading: loadingAuthInfo,
    notAuthenticated,
    contextHeader,
    authenticated,
    logout,
    login,
    tokenInfo,
    isVisitor,
    urlAlias,
  } = useAuth();

  return (
    <WenoLayout
      authenticated={authenticated}
      loginFn={login}
      logoutFn={logout}
      tokenInfo={tokenInfo}
      urlAlias={urlAlias}
    >
      {!username && <h1>{t("urlError")}</h1>}

      {loadingAuthInfo && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            {t("fetchingUser")}
          </Heading>
        </Flex>
      )}

      {notAuthenticated && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            {t("onlyWenoUsers")}
          </Heading>
        </Flex>
      )}
      {authenticated && (
        <UserProfile
          isVisitor={isVisitor}
          username={tokenInfo.preferred_username}
          email={tokenInfo.email}
          contextHeader={contextHeader}
          logoutFn={logout}
        />
      )}
    </WenoLayout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(User);
