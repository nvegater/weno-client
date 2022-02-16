import {
  Box,
  Heading,
  HStack,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { HiCheckCircle } from "react-icons/hi";
import { PricingCard } from "./PricingCard";
import { useTranslation } from "react-i18next";

const FeatureItem: React.FC = ({ children }) => (
  <HStack>
    <Box flexShrink={0} as={HiCheckCircle} fontSize="xl" color={"brand.500"} />
    <Text>{children}</Text>
  </HStack>
);
interface TiersProps {
  register: (options?: Keycloak.KeycloakLoginOptions) => void;
}
export const Tiers: FC<TiersProps> = ({ register }) => {
  const onClickFn = () => {
    const webpageBase = window.location.origin;
    register({ redirectUri: webpageBase + "/register" });
  };
  const [t] = useTranslation("global");
  return (
    <Box as="section" bg={mode("gray.50", "gray.800")} py="20">
      <Box
        maxW={{ base: "xl", md: "5xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <Box maxW="2xl" mx="auto" textAlign={{ sm: "center" }}>
          <Text
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="wide"
            mb="3"
            color={"brand.300"}
          >
            {t("pricing")}
          </Text>
          <Heading
            as="h1"
            size="3xl"
            fontWeight="extrabold"
            letterSpacing="tight"
          >
            {t("choosePlan")}
          </Heading>
          <Text mt="6" fontSize="xl" color={mode("gray.600", "gray.400")}>
            and enjoy all our features
          </Text>
        </Box>

        <Box
          mt="10"
          bg={mode("white", "gray.700")}
          shadow="md"
          rounded="lg"
          px="10"
          pt="10"
          pb="12"
          mx="auto"
          maxW={{ base: "lg", md: "unset", lg: "unset" }}
        >
          <Text
            color={"brand.300"}
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="wide"
          >
            {t("featuresServices")}
          </Text>
          <Text fontSize="3xl" mt="2" fontWeight="bold">
            {t("includedAllPlans")}
          </Text>
          <SimpleGrid columns={{ base: 1, lg: 2 }} mt="5" spacing="5">
            <FeatureItem>Unlimited slots for your experiences</FeatureItem>
            <FeatureItem>Edit your experiences as much as you want</FeatureItem>
            <FeatureItem>Personalize your profile with your media</FeatureItem>
            <FeatureItem>Calendar to manage your events</FeatureItem>
            <FeatureItem>
              Best SEO and visibility in google searches.
            </FeatureItem>
            <FeatureItem>
              Invoices in your email, ready for the tax office.
            </FeatureItem>
            <FeatureItem>Worldwide payment infrastructure.</FeatureItem>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <FeatureItem>We DON'T take a cut on YOUR sales.</FeatureItem>
            <FeatureItem>
              Business intelligence and analytics on your sales
            </FeatureItem>
          </SimpleGrid>
        </Box>

        <SimpleGrid
          alignItems="flex-start"
          mt="16"
          columns={{ base: 1, lg: 3 }}
          spacing="10"
        >
          <PricingCard
            colorScheme="blue"
            bg="brand.900"
            color="brand.300"
            onClick={onClickFn}
            name="Cup membership"
            price={1199}
            duration="/mo"
            description="Wine producers focused in certain experiences"
            features={[
              "2 different experiences",
              "30 Reservations",
              "30 MXN / for each extra reservation",
            ]}
          />
          <PricingCard
            colorScheme="teal"
            bg="brand.300"
            color="brand.300"
            onClick={onClickFn}
            name="Bottle membership"
            price={1599}
            duration="/mo"
            description="Wine producers offering various experiences"
            features={[
              "5 different experiences",
              "50 Reservations",
              "24 MXN / for each extra reservation",
            ]}
          />
          <PricingCard
            bg="gradient.100"
            color="brand.300"
            colorScheme="teal"
            opacity={1}
            onClick={onClickFn}
            name="Magnum membership"
            price={2099}
            duration="/mo"
            description="Wine producers with options for all type of customers"
            features={[
              "20 experiences",
              "90 Reservations",
              "17 MXN / for each extra reservation",
            ]}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};
