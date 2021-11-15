import { Box } from "@chakra-ui/react";
import * as React from "react";
import { NavContent } from "./NavContent";
import useAuth from "../Authentication/useAuth";

export const NavBarWithSubmenu = () => {
  const { authenticated, tokenInfo, login, logout } = useAuth();

  return (
    <Box minH={3}>
      <Box as="header" bg="gradient.100" position="relative" zIndex="10">
        <Box
          as="nav"
          aria-label="Main navigation"
          maxW="7xl"
          mx="auto"
          px={{ base: "6", md: "8" }}
        >
          <NavContent.Mobile
            flexProps={{ display: { base: "flex", lg: "none" } }}
            authenticated={authenticated}
            loginFn={login}
            logoutFn={logout}
            {...tokenInfo}
          />
          <NavContent.Desktop
            flexProps={{ display: { base: "none", lg: "flex" } }}
            authenticated={authenticated}
            loginFn={login}
            logoutFn={logout}
            {...tokenInfo}
          />
        </Box>
      </Box>
    </Box>
  );
};
