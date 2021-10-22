import Head from "next/head";
import { createUrqlClient } from "../graphql/urqlProvider";
import { withUrqlClient } from "next-urql";
import { LandingPage } from "../components/LandingPage/LandingPage";

const Home = () => {
  return (
    <div>
      <Head>
        <title>Weno</title>
        <meta name="description" content="Weno" />
      </Head>
      <main>
        <LandingPage />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Home);
