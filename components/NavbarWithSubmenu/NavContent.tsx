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

const MobileNavContext = (props: FlexProps) => {
  const { isOpen, onToggle } = useDisclosure();
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="nav-content__mobile"
        {...props}
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
        <Button leftIcon={<RiLoginCircleFill />} size="navBarCTA" variant="cta">
          Login
        </Button>
      </Flex>
      <NavMenu
        animate={isOpen ? "open" : "closed"}
        bg="gradient.100"
        color="brand.100"
        height="100vh"
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
          <Button
            leftIcon={<RiLoginCircleFill />}
            size="sideBarCTA"
            variant="cta"
          >
            Login
          </Button>
        </Flex>
      </NavMenu>
    </>
  );
};

const DesktopNavContent = (props: FlexProps) => {
  return (
    <Flex
      className="nav-content__desktop"
      align="center"
      justify="space-between"
      {...props}
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
        <Button leftIcon={<RiLoginCircleFill />} size="navBarCTA" variant="cta">
          Login
        </Button>
      </HStack>
    </Flex>
  );
};

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
};
