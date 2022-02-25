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
            {t("enjoyFeatures")}
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
            <FeatureItem>{t("unlimitedSlots")}</FeatureItem>
            <FeatureItem>{t("editAsMuchAsYouWant")}</FeatureItem>
            <FeatureItem>{t("personalizeProfile")}</FeatureItem>
            <FeatureItem>{t("calendar")}</FeatureItem>
            <FeatureItem>{t("seoAndVisibility")}</FeatureItem>
            <FeatureItem>{t("emailInvoices")}</FeatureItem>
            <FeatureItem>{t("worldwidePayment")}</FeatureItem>
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <FeatureItem>{t("takeAnything")}</FeatureItem>
            <FeatureItem>{t("bussinessIntelligence")}</FeatureItem>
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
            color="brand.900"
            onClick={onClickFn}
            name="Cup"
            price={1199}
            duration="/mo"
            description={t("producersFocused")}
            features={[t("2Experiences"), t("30Reservations"), t("30Extra")]}
          />
          <PricingCard
            colorScheme="teal"
            color="brand.300"
            onClick={onClickFn}
            name="Bottle"
            price={1599}
            duration="/mo"
            description={t("producersOffering")}
            features={[t("5Experiences"), t("50Reservations"), t("24Extra")]}
          />
          <PricingCard
            color="gradient.100"
            colorScheme="teal"
            opacity={1}
            onClick={onClickFn}
            name="Magnum"
            price={2099}
            duration="/mo"
            description={t("producersWithOptions")}
            features={[t("20Experiences"), t("90Reservations"), t("17Extra")]}
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};
