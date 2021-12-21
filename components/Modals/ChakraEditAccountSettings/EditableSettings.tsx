import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import * as React from "react";
import { AccountSettings } from "./AccountSettings";

export const EditableSettings = () => (
  <Box
    bg={useColorModeValue("gray.50", "gray.800")}
    px={{ base: "4", md: "10" }}
    py="16"
  >
    <Box maxW="xl" mx="auto">
      <Stack spacing="12">
        <AccountSettings />
      </Stack>
    </Box>
  </Box>
);
