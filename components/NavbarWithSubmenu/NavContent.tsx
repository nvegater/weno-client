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
import { BiLogOut } from "react-icons/bi";
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
  logoutFn: () => void;
}

interface LoginButtonProps {
  loginFn: (options?: KeycloakLoginOptions) => void;
  isNavBar?: boolean;
}

interface LogoutButtonProps {
  logoutFn: () => void;
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

const LogoutButton = ({ logoutFn, isNavBar = false }: LogoutButtonProps) => {
  return (
    <Button
      leftIcon={<BiLogOut />}
      size={isNavBar ? "navBarCTA" : "sideBarCTA"}
      variant="cta"
      onClick={() => {
        logoutFn();
      }}
    >
      Logout
    </Button>
  );
};

const MobileNavContext = ({
  flexProps,
  loginFn,
  authenticated,
  logoutFn,
}: //userType,
//email,
//preferred_username,
NavBarProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      {/*NavBar (closed SideBar)-------------------------------------------*/}
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
        {!isOpen && (
          <>
            {!authenticated && <LoginButton loginFn={loginFn} isNavBar />}
            {authenticated && <LogoutButton logoutFn={logoutFn} isNavBar />}
          </>
        )}
      </Flex>
      {/*SIDEBAR-------------------------------------------*/}
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
          {authenticated && <LogoutButton logoutFn={logoutFn} />}
        </Flex>
      </NavMenu>
    </>
  );
};

const DesktopNavContent = ({
  flexProps,
  loginFn,
  authenticated,
  logoutFn,
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
        {authenticated && <LogoutButton logoutFn={logoutFn} isNavBar />}
      </HStack>
    </Flex>
  );
};

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
};
