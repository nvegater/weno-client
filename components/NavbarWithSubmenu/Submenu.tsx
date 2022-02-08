import { useNavMenu } from "./useNavMenu";
import { Box, Collapse, SimpleGrid, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "./_data";
import { NavLink } from "./NavLink";
import { NavMenu } from "./NavMenu";
import { SubmenuItem as DesktopMenuItem } from "./SubmenuItem";
import { useTranslation } from "react-i18next";

interface SubmenuProps {
  link: Link;
}

const DesktopSubmenu = (props: SubmenuProps) => {
  const { link } = props;
  const { isOpen, getMenuProps, getTriggerProps } = useNavMenu();
  const [t] = useTranslation("global");
  return (
    <>
      <NavLink.Desktop
        display="flex"
        alignItems="center"
        as="button"
        type="button"
        px="4"
        fontWeight="semibold"
        {...getTriggerProps()}
      >
        <Box>{link.label}</Box>
        <Box marginStart="2" as={FaChevronDown} fontSize="xs" />
      </NavLink.Desktop>

      <NavMenu
        {...getMenuProps()}
        animate={isOpen ? "open" : "closed"}
        bg="gradient.100"
        color="brand.100"
      >
        <Box maxW="7xl" mx="auto" px="8">
          <SimpleGrid spacing="10" columns={2}>
            {link.children?.map((item, idx) => (
              <DesktopMenuItem
                key={idx}
                title={t(item.label)}
                href={item.href}
                icon={item.icon}
              >
                {item.description}
              </DesktopMenuItem>
            ))}
          </SimpleGrid>
        </Box>
      </NavMenu>
    </>
  );
};

const MobileSubMenu = (props: SubmenuProps) => {
  const { link } = props;
  const { isOpen, onToggle } = useDisclosure();
  const [t] = useTranslation("global");

  return (
    <Box>
      <NavLink.Mobile
        as="button"
        type="button"
        cursor="pointer"
        onClick={onToggle}
        display="flex"
        justifyContent="center"
      >
        <Box mr={2}>{link.label}</Box>
        <Box
          as={FaChevronDown}
          transform={`rotate(${isOpen ? "180deg" : "0deg"})`}
        />
      </NavLink.Mobile>
      <Collapse in={isOpen}>
        <Box pl="5" textAlign="start" display="flex" justifyContent="start">
          {link.children?.map((item, idx) => (
            <NavLink.Mobile key={idx} href={item.href}>
              {t(item.label)}
            </NavLink.Mobile>
          ))}
        </Box>
      </Collapse>
    </Box>
  );
};

export const Submenu = {
  Mobile: MobileSubMenu,
  Desktop: DesktopSubmenu,
};
