import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../graphql/urqlProvider";
import { WenoLayout } from "../components/GeneralLayout/WenoLayout";
import { Tiers } from "../components/Tiers/Tiers";
import useAuth from "../components/Authentication/useAuth";

const Subscriptions = () => {
  const {
    authenticated,
    logout,
    login,
    register,
    email,
    isOwner,
    isVisitor,
    preferred_username,
  } = useAuth();
  return (
    <WenoLayout
      loginFn={login}
      logoutFn={logout}
      authenticated={authenticated}
      email={email}
      isOwner={isOwner}
      isVisitor={isVisitor}
      preferred_username={preferred_username}
    >
      <Tiers register={register} />
    </WenoLayout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Subscriptions);
