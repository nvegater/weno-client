/*
 * Chakra has a specific approach or API for styling components.
 *
 * base styles (baseStyle)
 * styles for different sizes (sizes)
 * styles for different visual variants (variants).
 * e.g. https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/button.ts
 * */

const variants = {
  Weno: {
    borderColor: "#9F449D",
    color: "brand.200",
    borderRadius: "6px",
    iconColor: "#9F449D",
  },
};

const Select = {
  font: {
    primary: {
      fontFamily: "GothamText",
      fontWeight: "400",
    },
    secondary: {
      fontFamily: "GothamLogo",
      fontWeight: "700",
    },
  },
  sizes: {
    phoneWeno: {
      minWidth: "152px",
      height: "42px",
      fontSize: "xs",
    },
    sideBarCTA: {
      minWidth: "230px",
      height: "32px",
    },
  },
  variants,
};
export default Select;
