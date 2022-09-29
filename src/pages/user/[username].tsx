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
    authenticated,
    logout,
    login,
    isVisitor,
    email,
    isOwner,
    preferred_username,
  } = useAuth();

  return (
    <WenoLayout
      authenticated={authenticated}
      loginFn={login}
      logoutFn={logout}
      email={email}
      isOwner={isOwner}
      isVisitor={isVisitor}
      preferred_username={preferred_username}
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
          username={preferred_username}
          email={email}
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
