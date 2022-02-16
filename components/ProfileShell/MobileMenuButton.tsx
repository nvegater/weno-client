import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import { HiX } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";
import { useTranslation } from "react-i18next";

interface MobileMenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const MobileMenuButton = (props: MobileMenuButtonProps) => {
  const { onClick, isOpen } = props;
  const [t] = useTranslation("global");
  return (
    <Box
      display={{ base: "block", md: "none" }}
      ml="-8"
      mr="2"
      as="button"
      type="button"
      rounded="md"
      p="1"
      fontSize="xl"
      color="gray.500"
      _hover={{ bg: "white" }}
      onClick={onClick}
    >
      <Box srOnly>{isOpen ? t("closeMenu") : t("openMenu")}</Box>
      {isOpen ? (
        <HiX />
      ) : (
        <Flex alignItems="center">
          <CgMenuGridR />
          <Box pl={2}>Profile Menu</Box>
        </Flex>
      )}
    </Box>
  );
};
