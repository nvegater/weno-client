/*
 * Chakra has a specific approach or API for styling components.
 *
 * base styles (baseStyle)
 * styles for different sizes (sizes)
 * styles for different visual variants (variants).
 *
 * */

const Button = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: "bold", // Normally, it is "semibold"
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    heroWeno: {
      width: "152px",
      height: "42px",
      fontSize: "xs",
    },
    sideBarCTA: {
      width: "372px",
      height: "79px",
    },
    navBarCTA: {
      width: "125px",
      height: "34px",
      fontSize: "xs",
    },
  },
  // 3. We can add a new visual variant
  variants: {
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
    // 4. We can override existing variants
    /* solid: (props) => ({
      bg: props.colorMode === "dark" ? "red.300" : "red.500",
    }),*/
  },
};
export default Button;
