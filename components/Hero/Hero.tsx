import {
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import * as Logos from "./Brands";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const Hero = () => {
  const { keycloak, initialized } = useKeycloak<KeycloakInstance>();
  const [t] = useTranslation("global");

  return (
    <Box>
      <Box
        as="section"
        bg="gradient.100"
        color="brand.100"
        pt="3rem"
        pb="1rem"
        borderBottomRadius="12px 12px"
      >
        <Box
          maxW={{ base: "xl", md: "5xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <Box textAlign="center">
            <Heading
              as="h1"
              size="3xl"
              fontWeight="500"
              maxW="48rem"
              mx="auto"
              lineHeight="1.2"
              letterSpacing="10%"
            >
              {t("homeHeading")}
            </Heading>
            <Text fontSize="xl" mt="4" maxW="xl" mx="auto">
              Made for wine lovers & growers
            </Text>
          </Box>

          <Stack
            justify="center"
            direction={{ base: "column", md: "row" }}
            mt="10"
            mb="20"
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
              <Link href="/subscriptions">{t("subscribe")}</Link>
            </Button>
          </Stack>
        </Box>
      </Box>

      <Box as="section" py="24">
        <Box
          maxW={{ base: "xl", md: "7xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <Text
            fontWeight="bold"
            fontSize="sm"
            textAlign="center"
            textTransform="uppercase"
            letterSpacing="wide"
            color={mode("gray.600", "gray.400")}
          >
            {t("footerHeading")}
          </Text>
          <SimpleGrid
            mt="8"
            columns={{ base: 1, md: 2, lg: 6 }}
            color="gray.500"
            alignItems="center"
            justifyItems="center"
            spacing={{ base: "12", lg: "24" }}
            fontSize="2xl"
          >
            <Logos.ChatMonkey />
            <Logos.Wakanda />
            <Logos.Lighthouse />
            <Logos.Plumtic />
            <Logos.WorkScout />
            <Logos.Finnik />
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
};
