import {
  Box,
  Button,
  Flex,
  FlexProps,
  HStack,
  Switch,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import * as React from "react";
import { NavLink } from "./NavLink";
import { NavMenu } from "./NavMenu";
import { Submenu } from "./Submenu";
import { ToggleButton } from "./ToggleButton";
import { generateLinks } from "./_data";
import { RiLoginCircleFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { Weno } from "../Hero/Brands";
import Link from "next/link";
import { KeycloakLoginOptions } from "keycloak-js";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const LogoTextSidebar = (
  <Text
    ml={2}
    color="brand.100"
    fontSize="2xl"
    fontWeight="700"
    visibility={["hidden", "visible"]}
  >
    Weno
  </Text>
);

const LogoTextNavbar = (
  <Text ml={2} color="brand.100" fontSize="2xl" fontWeight="700">
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
  urlAlias: string | null;
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
  const [t] = useTranslation("global");
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
      {t("logIn")}
    </Button>
  );
};

const LogoutButton = ({ logoutFn, isNavBar = false }: LogoutButtonProps) => {
  const [t] = useTranslation("global");
  return (
    <Button
      leftIcon={<BiLogOut />}
      size={isNavBar ? "navBarCTA" : "sideBarCTA"}
      variant="cta"
      onClick={() => {
        logoutFn();
      }}
    >
      {t("logOut")}
    </Button>
  );
};

const MobileNavContext = ({
  flexProps,
  loginFn,
  authenticated,
  logoutFn,
  userType,
  urlAlias,
  preferred_username,
}: NavBarProps) => {
  const { isOpen, onToggle } = useDisclosure();
  const [t, i18n] = useTranslation("global");
  const [isEnglish, setIsEnglish] = useState<boolean>(false);

  const changeLanguage = async () => {
    if (isEnglish) {
      setIsEnglish(false);
      await i18n.changeLanguage("es");
    }

    if (!isEnglish) {
      setIsEnglish(true);
      await i18n.changeLanguage("en");
    }
  };
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
            {isOpen ? LogoTextNavbar : LogoTextSidebar}
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
        fontSize="xl"
      >
        {generateLinks(urlAlias, preferred_username, userType).map(
          (link, idx) => (
            <Box py={4} key={idx}>
              {link.children ? (
                <Submenu.Mobile link={link} />
              ) : (
                <NavLink.Mobile href={link.href}>
                  {t(link.label)}
                </NavLink.Mobile>
              )}
            </Box>
          )
        )}
        <Flex justifyContent="center" py={4}>
          {!authenticated && <LoginButton loginFn={loginFn} />}
          {authenticated && <LogoutButton logoutFn={logoutFn} />}
        </Flex>
        <Flex py={4} justifyContent="center">
          español{" "}
          <Switch
            size="lg"
            px={2}
            colorScheme="purple"
            onChange={changeLanguage}
          />{" "}
          inglés
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
  userType,
  urlAlias,
  preferred_username,
}: NavBarProps) => {
  const [t, i18n] = useTranslation("global");
  const [isEnglish, setIsEnglish] = useState<boolean>(false);

  const changeLanguage = async () => {
    if (isEnglish) {
      setIsEnglish(false);
      await i18n.changeLanguage("es");
    }

    if (!isEnglish) {
      setIsEnglish(true);
      await i18n.changeLanguage("en");
    }
  };
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
          {LogoTextNavbar}
        </Flex>
      </Link>
      <HStack
        as="ul"
        id="nav__primary-menu"
        aria-label="Main Menu"
        listStyleType="none"
      >
        {generateLinks(urlAlias, preferred_username, userType).map(
          (link, idx) => (
            <Box as="li" key={idx} id={`nav__menuitem-${idx}`}>
              {link.children ? (
                <Submenu.Desktop link={link} />
              ) : (
                <NavLink.Desktop href={link.href}>
                  {t(link.label)}
                </NavLink.Desktop>
              )}
            </Box>
          )
        )}
      </HStack>
      <HStack spacing="8" justify="space-between">
        {!authenticated && <LoginButton loginFn={loginFn} isNavBar />}
        {authenticated && <LogoutButton logoutFn={logoutFn} isNavBar />}
        <Flex justifyContent="center" color="white">
          ES{" "}
          <Switch
            size="md"
            px={2}
            colorScheme="purple"
            onChange={changeLanguage}
          />{" "}
          EN
        </Flex>
      </HStack>
    </Flex>
  );
};

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
};
