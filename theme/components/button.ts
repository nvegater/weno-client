/*
 * Chakra has a specific approach or API for styling components.
 *
 * base styles (baseStyle)
 * styles for different sizes (sizes)
 * styles for different visual variants (variants).
 * e.g. https://github.com/chakra-ui/chakra-ui/blob/main/packages/theme/src/components/button.ts
 * */

const variants = {
  primaryWeno: {
    bg: "brand.100",
    color: "brand.200",
    borderRadius: "6px",
  },
  secondaryWeno: {
    bg: "gradient.100",
    color: "brand.100",
    border: "1px solid #9F449D",
    borderRadius: "6px",
  },
  cta: {
    filter: "drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.1))",
    color: "white",
    bg: "brand.300",
  },
};

const Button = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: "bold", // Normally, it is "semibold"
    padding: 2,
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    heroWeno: {
      minWidth: "152px",
      height: "42px",
      fontSize: "xs",
    },
    sideBarCTA: {
      minWidth: "350px",
      width: "370px",
      height: "75px",
    },
    navBarCTA: {
      minWidth: "100px",
      width: ["100px", "125px"],
      height: "34px",
      fontSize: "xs",
    },
  },
  // 3. We can add a new visual variant
  variants,
};
export default Button;
