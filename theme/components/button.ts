/*
 * Chakra has a specific approach or API for styling components.
 *
 * base styles (baseStyle)
 * styles for different sizes (sizes)
 * styles for different visual variants (variants).
 *
 * */

const ButtonStyle = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: "bold", // Normally, it is "semibold"
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    banana: {
      h: "56px",
      fontSize: "lg",
      px: "32px",
    },
  },
  // 3. We can add a new visual variant
  variants: {
    primaryWeno: {
      bg: "gradient.100",
      color: "brand.100",
      borderRadius: "6px",
      width: "153px",
      height: "48px",
    },
    secondaryWeno: {
      bg: "brand.100",
      color: "brand.200",
      // TODO move sizes and radius to the styles file and use the objects
      borderRadius: "6px",
      width: "152px",
      height: "42px",
    },
    // 4. We can override existing variants
    solid: (props) => ({
      bg: props.colorMode === "dark" ? "red.300" : "red.500",
    }),
  },
};
export default ButtonStyle;
