import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Box, Button, Link, Text } from "@chakra-ui/react";
import { createUrqlClient } from "../graphql/urqlProvider";
import { withUrqlClient } from "next-urql";
import { useMeQuery } from "../graphql/generated/graphql";
import NextLink from "next/link";

const Home = () => {
  const [{ data, error, fetching }] = useMeQuery();

  if (data === undefined) {
    if (error) return <div>Error</div>;
    return fetching ? <div>Loading</div> : <div>Something went wrong</div>;
  }
  if (
    data.me === undefined ||
    data.me === null ||
    data.me.user === null ||
    data.me.user === undefined
  ) {
    return (
      <div>
        Something is wrong with your user credentials
        <NextLink href="/login">
          <Link>
            <b>Login again</b>
          </Link>
        </NextLink>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Weno</title>
        <meta name="description" content="Weno" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to Weno</h1>

        <p className={styles.description}>
          Get started by editing{" "}
          <code className={styles.code}>pages/index.js</code>
        </p>
      </main>

      <Box bg={["brand.100", "brand.200", "brand.300", "brand.400"]}>
        <Text color="white">Hola</Text>
        <Button variant="with-shadow" size="banana">
          With fancy stuff
        </Button>
      </Box>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Rescens
        </a>
      </footer>
    </div>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Home);
