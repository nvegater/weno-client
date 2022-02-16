import React, { FC, ReactNode } from "react";
import { Box, Flex, Stack } from "@chakra-ui/react";
import { useMobileMenuState } from "./useMobileMenuState";
import { MobileMenuButton } from "./MobileMenuButton";
import { WineryFragmentFragment } from "../../graphql/generated/graphql";
import { AccountSwitcher } from "./AccountSwitcher";
import { ScrollArea } from "./ScrollArea";

interface ShellLayoutProps {
  navGroupes: ReactNode;
  subpages: ReactNode;
  winery?: WineryFragmentFragment;
  logoutFn: () => void;
  email: string;
  name: string;
}

export const ShellLayout: FC<ShellLayoutProps> = ({
  navGroupes,
  subpages,
  email,
  name,
  logoutFn,
  winery,
}) => {
  const { isOpen, toggle } = useMobileMenuState();

  return (
    <Flex
      height="100vh"
      bg="brand.600"
      overflow="hidden"
      sx={{ "--sidebar-width": "16rem" }}
    >
      <Box
        as="nav"
        display="block"
        flex="1"
        width="var(--sidebar-width)"
        left="0"
        py="5"
        px="3"
        color="brand.100"
        position="fixed"
      >
        <Box fontSize="sm" lineHeight="tall">
          <AccountSwitcher
            email={email}
            username={name}
            logoutFn={logoutFn}
            wineryName={winery ? winery.name : undefined}
          />
          <ScrollArea pt="5" pb="6">
            <Stack spacing="8" flex="1" overflow="auto" pt="8">
              {navGroupes}
            </Stack>
          </ScrollArea>
        </Box>
      </Box>
      <Box
        flex="1"
        p={{ base: "0", md: "6" }}
        marginStart={{ md: "var(--sidebar-width)" }}
        position="relative"
        left={isOpen ? "var(--sidebar-width)" : "0"}
        transition="left 0.2s"
      >
        <Box
          maxW="2560px"
          bg="brand.100"
          height="100%"
          pb="6"
          rounded={{ md: "lg" }}
        >
          <Flex direction="column" height="full">
            <Flex
              w="full"
              py="4"
              justify="space-between"
              align="center"
              px="10"
            >
              <Flex align="center" minH="8">
                <MobileMenuButton onClick={toggle} isOpen={isOpen} />
              </Flex>
            </Flex>
            <Flex direction="column" flex="1" overflow="auto" px="5">
              {subpages}
            </Flex>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
};
