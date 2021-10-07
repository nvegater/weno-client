import { chakra, HTMLChakraProps } from "@chakra-ui/react";
import * as React from "react";

interface NavLinkProps extends HTMLChakraProps<"a"> {
  active?: boolean;
}

const DesktopNavLink = React.forwardRef<HTMLAnchorElement, NavLinkProps>(
  (props, ref) => {
    const { active, ...rest } = props;
    return (
      <chakra.a
        ref={ref}
        display="inline-block"
        px="4"
        py="6"
        fontWeight="bold"
        aria-current={active ? "page" : undefined}
        color="brand.100"
        transition="all 0.2s"
        {...rest}
        _hover={{ color: "black" }}
        _active={{ color: "brand.300" }}
        _activeLink={{
          color: "brand.300",
          fontWeight: "bold",
        }}
      />
    );
  }
);
DesktopNavLink.displayName = "DesktopNavLink";

export const MobileNavLink = (props: NavLinkProps) => {
  const { active, ...rest } = props;
  return (
    <chakra.a
      aria-current={active ? "page" : undefined}
      w="full"
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="14"
      fontWeight="bold"
      {...rest}
    />
  );
};

export const NavLink = {
  Mobile: MobileNavLink,
  Desktop: DesktopNavLink,
};
