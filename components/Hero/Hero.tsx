import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import * as React from "react";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const [t] = useTranslation("global");

  return (
    <Box
      as="section"
      bg="gradient.100"
      color="brand.100"
      pt="3rem"
      pb="1rem"
      px={{ base: "6", md: "8" }}
      mx="auto"
      borderBottomRadius="12px 12px"
      textAlign="center"
    >
      <Heading
        as="h1"
        size="3xl"
        fontWeight="500"
        maxW="48rem"
        mx="auto"
        lineHeight="1.2"
        letterSpacing="10%"
      >
        {t("delightIn")}
      </Heading>
      <Heading
        as="h2"
        size="4xl"
        fontWeight="extrabold"
        maxW="48rem"
        mx="auto"
        lineHeight="1.2"
        letterSpacing="normal"
        color="brand.700"
      >
        {t("enoturism")}
      </Heading>
      <Text fontSize="xl" mt="4" maxW="xl" mx="auto">
        {t("madeForWine")}
      </Text>

      <Stack
        justify="center"
        direction={{ base: "column", md: "row" }}
        my={10}
        display="flex"
      >
        <Button
          variant="primaryWeno"
          size="heroWeno"
          onClick={() => {
            if (initialized && !keycloak.authenticated) {
              const webpageBase = window.location.origin;
              keycloak.register({ redirectUri: webpageBase + "/register" });
            }
          }}
        >
          {t("register")}
        </Button>
        <Button size="heroWeno" variant="cta">
          <Link href="/subscriptions">{t("offerExperiences")}</Link>
        </Button>
      </Stack>
    </Box>
  );
};
