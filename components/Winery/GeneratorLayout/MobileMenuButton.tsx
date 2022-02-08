import { Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import { HiX } from "react-icons/hi";
import { CgMenuGridR } from "react-icons/cg";

interface MobileMenuButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export const MobileMenuButton = (props: MobileMenuButtonProps) => {
  const { onClick, isOpen } = props;
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
      <Box srOnly>{isOpen ? "Close Menu" : "Open Menu"}</Box>
      {isOpen ? (
        <HiX />
      ) : (
        <Flex alignItems="center">
          <CgMenuGridR />
          <Box pl={2}>Creator Menu</Box>
        </Flex>
      )}
    </Box>
  );
};
