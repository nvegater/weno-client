import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { Logo } from "./Logo";
import { GoogleIcon } from "./ProviderIcons";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers";

interface LoginWithGradientProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  >;
}

function getProviderIcon(provider: string) {
  if (provider === "Google") return <GoogleIcon boxSize="5" />;
  else return <></>;
}

export const LoginWithGradient: FC<LoginWithGradientProps> = ({
  providers,
}) => {
  return (
    <Box
      bgGradient={{ sm: "linear(to-r, pink.600, purple.600)" }}
      py={{ base: "12", md: "24" }}
    >
      <Container
        maxW="md"
        py={{ base: "0", sm: "8" }}
        px={{ base: "4", sm: "10" }}
        bg={"white"}
        boxShadow={{ base: "none", sm: "xl" }}
        borderRadius={{ base: "none", sm: "xl" }}
      >
        <Stack spacing="8">
          <Stack spacing="6" align="center">
            <Box>
              <Logo />
              <Text fontSize="xl" fontWeight="600">
                Weno
              </Text>
            </Box>
            <Stack spacing="3" textAlign="center">
              <Heading size="xs">Log in to your account</Heading>
              <Text color="muted">Start enjoying tourism ... and wine </Text>
            </Stack>
          </Stack>
          <Stack spacing="6">
            {Object.values(providers).map((provider) => {
              return (
                <Button
                  key={provider.id}
                  bg="white"
                  outline="1px solid lightgray"
                  leftIcon={getProviderIcon(provider.name)}
                  iconSpacing="3"
                  onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                >
                  Continue with {provider.name}
                </Button>
              );
            })}

            <Divider />
            <Stack spacing="4">
              <Input
                placeholder="Enter your email"
                _focus={{ borderColor: "white" }}
              />
              <Button variant="cta">Continue with email</Button>
            </Stack>
          </Stack>
          <Stack spacing="0.5" align="center">
            <Text fontSize="sm" color="muted">
              Having trouble logging in?
            </Text>
            <Button variant="link" colorScheme="pink" size="sm">
              Contact us
            </Button>
          </Stack>
          <Text fontSize="xs" color="subtle" textAlign="center">
            By continuing, you acknowledge that you have read, understood, and
            agree to our terms and condition
          </Text>
        </Stack>
      </Container>
    </Box>
  );
};
