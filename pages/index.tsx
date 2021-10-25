import Head from "next/head";
import { createUrqlClient } from "../graphql/urqlProvider";
import { withUrqlClient } from "next-urql";
import { LandingPage } from "../components/LandingPage/LandingPage";
import { ExperienceCardCover } from "../components/Cards/ExperienceCardCover";

const Home = () => {
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
        <LandingPage />
        <ExperienceCardCover />
      </main>
      <footer>Footer</footer>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Home);
