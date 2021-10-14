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
        <Box as="a" rel="home">
          <Flex alignItems="center">
            <Weno h="2.1em" w="2.1em" />
            <Text
              ml={2}
              fontFamily="fonts.logo"
              fontWeight="700"
              color="brand.100"
              fontSize="24px"
            >
              Weno
            </Text>
          </Flex>
        </Box>
      </Flex>
      <NavMenu
        animate={isOpen ? "open" : "closed"}
        bg="gradient.100"
        color="brand.100"
        height="35rem"
      >
        {links.map((link, idx) =>
          link.children ? (
            <Submenu.Mobile key={idx} link={link} />
          ) : (
            <NavLink.Mobile key={idx} href={link.href}>
              {link.label}
            </NavLink.Mobile>
          )
        )}
        <Flex justifyContent="center" py={4}>
          <Button
            leftIcon={<RiLoginCircleFill />}
            size="sideBarCTA"
            variant="cta"
          >
            Sign in
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
      <Box as="a" href="#" rel="home">
        <Flex alignItems="center">
          <Weno h="2.1em" w="2.1em" />
          <Text
            ml={2}
            fontFamily="fonts.logo"
            fontWeight="700"
            color="brand.100"
            fontSize="24px"
          >
            Weno
          </Text>
        </Flex>
      </Box>
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
          Sign in
        </Button>
      </HStack>
    </Flex>
  );
};

export const NavContent = {
  Mobile: MobileNavContext,
  Desktop: DesktopNavContent,
};
