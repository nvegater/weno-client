import {
  Box,
  Button,
  Heading,
  LightMode,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import * as Logos from "./Brands";

export const Hero = () => {
  return (
    <Box>
      <Box as="section" bg="gradient.100" color="brand.100" py="7.5rem">
        <Box
          maxW={{ base: "xl", md: "5xl" }}
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <Box textAlign="center">
            <Heading
              as="h1"
              size="3xl"
              fontWeight="extrabold"
              maxW="48rem"
              mx="auto"
              lineHeight="1.2"
              letterSpacing="tight"
            >
              Be part of the next generation of wine tourism
            </Heading>
            <Text fontSize="xl" mt="4" maxW="xl" mx="auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore
            </Text>
          </Box>

          <Stack
            justify="center"
            direction={{ base: "column", md: "row" }}
            mt="10"
            mb="20"
            spacing="4"
          >
            <LightMode>
              <Button as="a" href="#" variant="primaryWeno" size="heroWeno">
                Get started free
              </Button>
              <Button as="a" href="#" variant="secondaryWeno" size="heroWeno">
                Request demo
              </Button>
            </LightMode>
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
            Trusted by over 6,000 blues
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