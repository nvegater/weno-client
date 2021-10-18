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
    borderRadius: "12px",
  },
};

const Card = {
  // 1. We can update the base styles
  baseStyle: {
    fontWeight: "semibold", // Normally, it is "semibold"
  },
  // 2. We can add a new button size or extend existing
  sizes: {
    landingDesktop: {
      width: "342px",
      height: "342px",
    },
    landingPhone: {
      width: "274px",
      height: "274px",
    },
  },
  // 3. We can add a new visual variant
  variants,
};
export default Card;
