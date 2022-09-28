import { Box } from "@chakra-ui/react";
import * as React from "react";
import { FC, useState } from "react";
import { NavContent } from "./NavContent";
import { NavBarProps } from "../GeneralLayout/WenoLayout";
import { useWineryQuery } from "../../graphql/generated/graphql";
import { useEffectOnChange } from "../utils/react-utils";

export const NavBarWithSubmenu: FC<NavBarProps> = ({
  loginFn,
  authenticated,
  logoutFn,
  email,
  preferred_username,
  isVisitor,
  isOwner,
}) => {
  const [urlAlias, setUrlAlias] = useState<string | null>(null);
  const [{ data: wineryResponse }] = useWineryQuery({
    variables: {
      getWineryInputs: {
        creatorUsername: preferred_username !== "" ? preferred_username : null,
      },
    },
    pause: email === "" || (email !== "" && isVisitor),
    requestPolicy: "cache-first",
  });

  useEffectOnChange(() => {
    if (isOwner && wineryResponse?.winery?.winery) {
      setUrlAlias(wineryResponse?.winery?.winery.urlAlias ?? null);
    }
  }, [wineryResponse]);
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
            email={email}
            preferred_username={preferred_username}
            userType={isVisitor ? "visitor" : "owner"}
          />
          <NavContent.Desktop
            flexProps={{ display: { base: "none", lg: "flex" } }}
            authenticated={authenticated}
            loginFn={loginFn}
            logoutFn={logoutFn}
            urlAlias={urlAlias}
            email={email}
            preferred_username={preferred_username}
            userType={isVisitor ? "visitor" : "owner"}
          />
        </Box>
      </Box>
    </Box>
  );
};
