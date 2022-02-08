import { Box } from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { NavContent } from "./NavContent";
import { NavBarProps } from "../GeneralLayout/WenoLayout";

export const NavBarWithSubmenu: FC<NavBarProps> = ({
  loginFn,
  authenticated,
  logoutFn,
  tokenInfo,
  urlAlias,
}) => {
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
            loginFn={loginFn}
            logoutFn={logoutFn}
            urlAlias={urlAlias}
            {...tokenInfo}
          />
          <NavContent.Desktop
            flexProps={{ display: { base: "none", lg: "flex" } }}
            authenticated={authenticated}
            loginFn={loginFn}
            logoutFn={logoutFn}
            urlAlias={urlAlias}
            {...tokenInfo}
          />
        </Box>
      </Box>
    </Box>
  );
};
