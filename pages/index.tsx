import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Box, Button, Text} from "@chakra-ui/react";

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Weno</title>
        <meta name="description" content="Weno" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to Weno
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

      </main>

        <Box bg={["brand.100", "brand.200", "brand.300", "brand.400"]}>
            <Text color="white">
                Hola
            </Text>
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
  )
}

export default Home
