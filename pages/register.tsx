import React, { FC, useEffect } from "react";
import { WenoLayout } from "../components/GeneralLayout/WenoLayout";
import { Button, Flex, Grid, Heading } from "@chakra-ui/react";
import { useCustomerQuery, useWineryQuery } from "../graphql/generated/graphql";
import useAuth from "../components/Authentication/useAuth";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../graphql/urqlProvider";
import { useRouter } from "next/router";
import { CreateWineryForm } from "../components/Winery/CreateWineryForm";

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
    urlAlias,
  } = useAuth();

  const router = useRouter();

  const [{ data: wineryResponse, error, fetching }] = useWineryQuery({
    variables: {
      getWineryInputs: {
        creatorUsername: tokenInfo ? tokenInfo.preferred_username : "",
      },
    },
    context: contextHeader,
    pause: loadingAuthInfo || notAuthenticated || tokenInfo === null,
    requestPolicy: "network-only",
  });

  const [{ data: customerResponse }] = useCustomerQuery({
    variables: {
      createCustomerInputs: {
        email: tokenInfo ? tokenInfo.email : "",
        paymentMetadata: {
          username: tokenInfo ? tokenInfo.preferred_username : null,
        },
      },
    },
    context: contextHeader,
    pause: loadingAuthInfo || notAuthenticated || tokenInfo === null,
    requestPolicy: "network-only",
  });

  // Redirect to Winery profile if user is logged in as owner and has created a winery
  useEffect(() => {
    if (!wineryResponse?.winery) {
      // Loading, do Nothing
      return;
    }
    const wineryAvailable = wineryResponse.winery?.winery;
    if (isOwner && wineryAvailable) {
      router.push(
        "/winery/[wineryAlias]",
        `/winery/${wineryResponse.winery.winery.urlAlias}`
      );
    }
    const customerAvailable = customerResponse?.customer.customer;
    if (isVisitor && customerAvailable) {
      console.log(customerAvailable);
      router.push("/user/[userId]", `/user/${customerAvailable.username}`);
    }
    // TODO REdirect to user Profile if its a visitor
  }, [wineryResponse, customerResponse, isOwner, isVisitor]);

  if (error) {
    throw error;
  }

  return (
    <WenoLayout
      loginFn={login}
      logoutFn={logout}
      authenticated={authenticated}
      tokenInfo={tokenInfo}
      urlAlias={urlAlias}
    >
      <Grid as="section" m={5}>
        {(loadingAuthInfo || fetching) && (
          <Flex justifyContent="center" m={5}>
            <Heading as="h2" size="xl">
              We are processing your credentials...
            </Heading>
          </Flex>
        )}
        {notAuthenticated && (
          <>
            <Flex justifyContent="center" m={5}>
              <Heading as="h1" size="xl">
                This page is only available for registered users.
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
                Register
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
                Login
              </Button>
            </Flex>
          </>
        )}
        {authenticated && isOwner && (
          <>
            <Flex justifyContent="center" m={5}>
              {wineryResponse &&
                wineryResponse.winery?.winery === null &&
                isOwner && (
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
