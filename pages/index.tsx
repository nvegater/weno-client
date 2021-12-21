import Head from "next/head";
import { createUrqlClient } from "../graphql/urqlProvider";
import { withUrqlClient } from "next-urql";
import useAuth from "../components/Authentication/useAuth";
import { WenoLayout } from "../components/GeneralLayout/WenoLayout";
import { Hero } from "../components/Hero/Hero";
import { AuthWrapper } from "../components/Authentication/AuthWrapper";
import React from "react";
import {
  ExperiencesGridLayout,
  ExperiencesGridMode,
} from "../components/Experiences/ExperiencesGridLayout";

const Home = () => {
  const { authenticated, logout, login, tokenInfo } = useAuth();
  // TODO retrieve experiences
  return (
    <div>
      <Head>
        <title>Weno</title>
        <meta name="description" content="Weno" />
        <link
          rel="preload"
          href="/custom-fonts/Gotham-Font/Gotham-Bold.otf"
          as="font"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/custom-fonts/Gotham-Font/GothamBook.ttf"
          as="font"
          crossOrigin=""
        />
      </Head>
      <main>
        <WenoLayout
          loginFn={login}
          logoutFn={logout}
          authenticated={authenticated}
          tokenInfo={tokenInfo}
        >
          <Hero />
          <AuthWrapper>
            <ExperiencesGridLayout
              experiences={[]}
              mode={ExperiencesGridMode.RESERVE}
            />
          </AuthWrapper>
        </WenoLayout>
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Home);
