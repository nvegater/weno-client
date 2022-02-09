import { Menu, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { AccountSwitcherButton } from "./AccountSwitcherButton";
import NextLink from "next/link";

interface AccountSwitcherProps {
  email: string;
  wineryName?: string;
  username: string;
  logoUrl?: string | undefined | null;
  logoutFn: () => void;
}

export const AccountSwitcher: FC<AccountSwitcherProps> = ({
  email,
  wineryName,
  username,
  logoUrl,
  logoutFn,
}) => {
  return (
    <Menu>
      <AccountSwitcherButton
        wineryName={wineryName}
        username={username}
        logoUrl={logoUrl ? logoUrl : ""}
      />
      <MenuList shadow="lg" py="4" color="brand.100" bg="brand.600" px="3">
        <Text fontWeight="medium" mb="2">
          {email}
        </Text>
        <MenuDivider />
        <MenuItem rounded="md" _focus={{ bg: "gradient.100" }}>
          <NextLink href="/">
            <b>Home</b>
          </NextLink>
        </MenuItem>
        <MenuItem rounded="md" _focus={{ bg: "gradient.100" }}>
          Terms and Conditions
        </MenuItem>
        <MenuItem rounded="md" _focus={{ bg: "gradient.100" }}>
          Help
        </MenuItem>
        <MenuDivider />
        <MenuItem
          rounded="md"
          onClick={logoutFn}
          _focus={{ bg: "gradient.100" }}
        >
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
