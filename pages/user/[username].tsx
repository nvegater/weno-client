import React from "react";
import { useRouter } from "next/router";
import useAuth from "../../components/Authentication/useAuth";
import { WenoLayout } from "../../components/GeneralLayout/WenoLayout";
import { Flex, Heading } from "@chakra-ui/react";

const User = () => {
  const router = useRouter();
  const { username } = router.query;

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

  return (
    <WenoLayout
      authenticated={authenticated}
      loginFn={login}
      logoutFn={logout}
      tokenInfo={tokenInfo}
      urlAlias={urlAlias}
    >
      {!username && <h1>Something is wrong with the Url</h1>}

      {loadingAuthInfo && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            We are fetching the user information....
          </Heading>
        </Flex>
      )}

      {notAuthenticated && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            Login to see your profile
          </Heading>
        </Flex>
      )}
      {username && authenticated && <div>Welcome {username}</div>}
    </WenoLayout>
  );
};

export default User;
