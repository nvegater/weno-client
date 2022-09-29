import { Menu, MenuDivider, MenuItem, MenuList, Text } from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { AccountSwitcherButton } from "./AccountSwitcherButton";
import NextLink from "next/link";
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation("global");
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
            <b>{t("home")}</b>
          </NextLink>
        </MenuItem>
        <MenuItem rounded="md" _focus={{ bg: "gradient.100" }}>
          {t("termsAndConditions")}
        </MenuItem>
        <MenuItem rounded="md" _focus={{ bg: "gradient.100" }}>
          {t("help")}
        </MenuItem>
        <MenuDivider />
        <MenuItem
          rounded="md"
          onClick={logoutFn}
          _focus={{ bg: "gradient.100" }}
        >
          {t("logout")}
        </MenuItem>
      </MenuList>
    </Menu>
  );
};
