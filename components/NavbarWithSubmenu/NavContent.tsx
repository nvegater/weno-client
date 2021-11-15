import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { NavLink } from "./NavLink";
import { NavMenu } from "./NavMenu";
import { Submenu } from "./Submenu";
import { ToggleButton } from "./ToggleButton";
import { links } from "./_data";
import { RiLoginCircleFill } from "react-icons/ri";
import { Weno } from "../Hero/Brands";
import Link from "next/link";
import { KeycloakLoginOptions } from "keycloak-js";

const LogoText = (
  <Text
    ml={2}
    fontFamily="GothamLogo"
    color="brand.100"
    fontSize="2xl"
    fontWeight="700"
  >
    Weno
  </Text>
);

interface NavBarProps {
  flexProps: FlexProps;
  authenticated: boolean;
  preferred_username: string | null;
  email: string | null;
  userType: "owner" | "visitor" | null;
  loginFn: (options?: KeycloakLoginOptions) => void;
}

interface LoginButtonProps {
  loginFn: (options?: KeycloakLoginOptions) => void;
  isNavBar?: boolean;
}

const LoginButton = ({ loginFn, isNavBar = false }: LoginButtonProps) => {
  return (
    <Button
      leftIcon={<RiLoginCircleFill />}
      size={isNavBar ? "navBarCTA" : "sideBarCTA"}
      variant="cta"
      onClick={() => {
        const webpageBase = window.location.origin;
        const redirectUri = webpageBase + "/register";
        loginFn({ redirectUri: redirectUri });
      }}
    >
      Login
    </Button>
  );
};

const MobileNavContext = ({
  flexProps,
  loginFn,
  authenticated,
}: //userType,
//email,
//preferred_username,
NavBarProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="nav-content__mobile"
        {...flexProps}
      >
        <Box flexBasis="6rem">
          <ToggleButton isOpen={isOpen} onClick={onToggle} />
        </Box>
        <Link href="/" passHref={true}>
          <Flex alignItems="center" cursor="pointer">
            <Weno h="2.1em" w="2.1em" />
            {LogoText}
          </Flex>
        </Link>
        {!authenticated && !isOpen && (
          <LoginButton loginFn={loginFn} isNavBar />
        )}
      </Flex>
      <NavMenu
        animate={isOpen ? "open" : "closed"}
        bg="gradient.100"
        color="brand.100"
        height="40vh"
        fontSize="xl"
        pt="70px"
      >
        {links.map((link, idx) => (
          <Box py={4} key={idx}>
            {link.children ? (
              <Submenu.Mobile link={link} />
            ) : (
              <NavLink.Mobile href={link.href}>{link.label}</NavLink.Mobile>
            )}
          </Box>
        ))}
        <Flex justifyContent="center" py={4}>
          {!authenticated && <LoginButton loginFn={loginFn} />}
        </Flex>
      </NavMenu>
    </>
  );
};

const DesktopNavContent = ({
  flexProps,
  loginFn,
  authenticated,
}: //userType,
//email,
//preferred_username,
NavBarProps) => {
  return (
    <Flex
      className="nav-content__desktop"
      align="center"
      justify="space-between"
      {...flexProps}
    >
      <Link href="/" passHref={true}>
        <Flex alignItems="center" cursor="pointer">
          <Weno h="2.1em" w="2.1em" />
          {LogoText}
        </Flex>
      </Link>
      <HStack
        as="ul"
        id="nav__primary-menu"
        aria-label="Main Menu"
        listStyleType="none"
      >
        {links.map((link, idx) => (
          <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
            {link.children ? (
              <Submenu.Desktop link={link} />
            ) : (
              <NavLink.Desktop href={link.href}>{link.label}</NavLink.Desktop>
            )}
          </Box>
        ))}
      </HStack>
      <HStack spacing="8" minW="240px" justify="space-between">
        {!authenticated && <LoginButton loginFn={loginFn} isNavBar />}
      </HStack>
    </Flex>
  );
};

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
};
