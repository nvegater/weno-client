import { Box, Center, chakra, VisuallyHidden } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

const Bar = chakra("span", {
  baseStyle: {
    display: "block",
    pos: "absolute",
    w: "1.25rem",
    h: "0.125rem",
    rounded: "full",
    bg: "brand.100",
    mx: "auto",
    insetStart: "0.125rem",
    transition: "all 0.12s",
  },
});

const ToggleIcon = (props: { active: boolean }) => {
  const { active } = props;
  return (
    <Box
      className="group"
      data-active={active ? "" : undefined}
      as="span"
      display="block"
      w="1.5rem"
      h="1.5rem"
      pos="relative"
      aria-hidden
      pointerEvents="none"
    >
      <Bar
        top="0.27rem"
        _groupActive={{ top: "0.6875rem", transform: "rotate(45deg)" }}
      />
      <Bar
        top="0.70rem"
        _groupActive={{ bottom: "0.6875rem", transform: "rotate(-45deg)" }}
      />
      <Bar top="1.1rem" _groupActive={{ visibility: "hidden" }} />
    </Box>
  );
};

interface ToggleButtonProps {
  isOpen: boolean;
  onClick(): void;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  const { isOpen, onClick } = props;
  const [t] = useTranslation("global");
  return (
    <Center
      marginStart="-6"
      px="4"
      py="4"
      as="button"
      color="gray.400"
      _active={{ color: "blue.600" }}
      onClick={onClick}
    >
      <ToggleIcon active={isOpen} />
      <VisuallyHidden>{t("toggleMenu")}</VisuallyHidden>
    </Center>
  );
};
