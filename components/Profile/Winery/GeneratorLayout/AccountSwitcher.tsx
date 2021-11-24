import {
  Menu,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { AccountSwitcherButton } from "./AccountSwitcherButton";
import NextLink from "next/link";

interface AccountSwitcherProps {
  email: string;
  wineryName: string;
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
      <MenuList
        shadow="lg"
        py="4"
        color={useColorModeValue("gray.600", "gray.200")}
        px="3"
      >
        <Text fontWeight="medium" mb="2">
          {email}
        </Text>
        <MenuDivider />
        <MenuItem rounded="md">
          <NextLink href="/">
            <b>Home</b>
          </NextLink>
        </MenuItem>
        <MenuItem rounded="md">Terms and Conditions</MenuItem>
        <MenuItem rounded="md">Help</MenuItem>
        <MenuDivider />
        <MenuItem rounded="md" onClick={logoutFn}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
