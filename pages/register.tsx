import React, { FC, useEffect } from "react";
import { WenoLayout } from "../components/GeneralLayout/WenoLayout";
import { Button, Flex, Grid, Heading } from "@chakra-ui/react";
import { useWineryQuery } from "../graphql/generated/graphql";
import useAuth from "../components/Authentication/useAuth";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../graphql/urqlProvider";
import { useRouter } from "next/router";
import { CreateWineryForm } from "../components/RegisterWinery/CreateWineryForm";
import { useTranslation } from "react-i18next";

interface RegisterProps {}

const Register: FC<RegisterProps> = ({}) => {
  const {
    contextHeader,
    tokenInfo,
    authenticated,
    loading: loadingAuthInfo,
    notAuthenticated,
    isOwner,
    isVisitor,
    register,
    login,
    logout,
  } = useAuth();

  const router = useRouter();
  const [t] = useTranslation("global");
  if (authenticated && isVisitor && tokenInfo) {
    // TODO REdirect to user Profile if its a visitor
    router.push("/");
  }

  const [{ data, error, fetching }] = useWineryQuery({
    variables: {
      getWineryInputs: {
        creatorUsername: tokenInfo ? tokenInfo.preferred_username : "",
      },
    },
    context: contextHeader,
    pause: loadingAuthInfo || notAuthenticated || tokenInfo === null,
    requestPolicy: "network-only",
  });

  // Redirect to Winery profile if user is logged in as owner and has created a winery
  useEffect(() => {
    if (!data?.winery) {
      // Loading, do Nothing
      return;
    }
    const wineryAvailable = data.winery?.winery;
    if (isOwner && wineryAvailable) {
      router.push(
        "/winery/[wineryAlias]",
        `/winery/${data.winery.winery.urlAlias}`
      );
    }
    // TODO REdirect to user Profile if its a visitor
  }, [data, isOwner, router]);

  if (error) {
    throw error;
  }

  return (
    <WenoLayout
      loginFn={login}
      logoutFn={logout}
      authenticated={authenticated}
      tokenInfo={tokenInfo}
    >
      <Grid as="section" m={5}>
        {(loadingAuthInfo || fetching) && (
          <Flex justifyContent="center" m={5}>
            <Heading as="h2" size="xl">
              {t("processingCredentials")}
            </Heading>
          </Flex>
        )}
        {notAuthenticated && (
          <>
            <Flex justifyContent="center" m={5}>
              <Heading as="h1" size="xl">
                {t("onlyRegisteredUsers")}
              </Heading>
            </Flex>
            <Flex justifyContent="space-around" m={5} alignItems="center">
              <Button
                variant="primaryWeno"
                size="heroWeno"
                onClick={() => {
                  const webpageBase = window.location.origin;
                  register({
                    redirectUri: webpageBase + "/register",
                  });
                }}
              >
                {t("register")}
              </Button>
              <Button
                variant="primaryWeno"
                size="heroWeno"
                onClick={() => {
                  const webpageBase = window.location.origin;
                  const redirectUri = webpageBase + "/register";
                  login({ redirectUri: redirectUri });
                }}
              >
                {t("logIn")}
              </Button>
            </Flex>
          </>
        )}
        {authenticated && (
          <>
            <Flex justifyContent="center" m={5}>
              {data && data.winery?.winery === null && isOwner && (
                <CreateWineryForm
                  username={tokenInfo?.preferred_username}
                  email={tokenInfo?.email}
                  contextHeader={contextHeader}
                />
              )}
            </Flex>
          </>
        )}
      </Grid>
    </WenoLayout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Register);
