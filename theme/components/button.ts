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
  /*  baseStyle: {
    fontWeight: "bold", // Normally, it is "semibold"
  },*/
  // 2. We can add a new button size or extend existing
  sizes: {
    heroWeno: {
      width: "152px",
      height: "42px",
      borderRadius: "6px",
    },
  },
  // 3. We can add a new visual variant
  variants: {
    primaryWeno: {
      bg: "brand.100",
      color: "brand.200",
    },
    secondaryWeno: {
      bg: "gradient.100",
      color: "brand.100",
      border: "1px solid #9F449D",
    },
    // 4. We can override existing variants
    /* solid: (props) => ({
      bg: props.colorMode === "dark" ? "red.300" : "red.500",
    }),*/
  },
};
export default Button;
