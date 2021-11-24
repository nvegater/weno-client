import {
  Box,
  Flex,
  FlexProps,
  HStack,
  Img,
  useMenuButton,
} from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { HiSelector } from "react-icons/hi";

interface AccountSwitcherButtonProps {
  flexProps?: FlexProps;
  wineryName: string;
  username: string;
  logoUrl?: string | undefined | null;
}

export const AccountSwitcherButton: FC<AccountSwitcherButtonProps> = ({
  flexProps,
  logoUrl,
  username,
  wineryName,
}) => {
  const buttonProps = useMenuButton(flexProps);
  return (
    <Flex
      as="button"
      {...buttonProps}
      w="full"
      display="flex"
      alignItems="center"
      rounded="lg"
      bg="gradient.100"
      px="3"
      py="2"
      fontSize="sm"
      userSelect="none"
      cursor="pointer"
      outline="0"
      transition="all 0.2s"
      _active={{ bg: "brand.200" }}
      _focus={{ shadow: "outline" }}
    >
      <HStack flex="1" spacing="3">
        {logoUrl && (
          <Img
            w="8"
            h="8"
            rounded="md"
            objectFit="cover"
            src={logoUrl}
            alt="Chakra UI"
          />
        )}
        <Box textAlign="start">
          <Box isTruncated fontWeight="semibold" color="brand.100">
            {wineryName}
          </Box>
          <Box fontSize="xs" color="brand.100">
            {username}
          </Box>
        </Box>
      </HStack>
      <Box fontSize="lg" color="brand.100">
        <HiSelector />
      </Box>
    </Flex>
  );
};
