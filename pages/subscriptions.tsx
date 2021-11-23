import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../graphql/urqlProvider";
import { WenoLayout } from "../components/GeneralLayout/WenoLayout";
import { useSubscriptionProductsQuery } from "../graphql/generated/graphql";
import { Tiers } from "../components/Tiers/Tiers";
import useAuth from "../components/Authentication/useAuth";

const Subscriptions = () => {
  const { authenticated, logout, login, tokenInfo } = useAuth();
  const [{ data, fetching, error }] = useSubscriptionProductsQuery();
  return (
    <WenoLayout
      loginFn={login}
      logoutFn={logout}
      authenticated={authenticated}
      tokenInfo={tokenInfo}
    >
      {" "}
      {<div>{JSON.stringify(data)}</div>}
      {fetching && <div>Loading...</div>}
      {error && <div>Error</div>}
      {data && <Tiers products={data.getSubscriptionProducts.products} />}
    </WenoLayout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Subscriptions);
