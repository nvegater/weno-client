import { createBreakpoints } from "@chakra-ui/theme-tools";
/*
 * Also from here but in individuals styles https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/foundations
blur.ts
borders.ts
breakpoints.ts
colors.ts
index.ts
radius.ts
shadows.ts
sizes.ts
spacing.ts
transition.ts
typography.ts
z-index.ts
 * */
/**
 * Breakpoints for responsive design
 */
const breakpoints = createBreakpoints({
  // base is all the smallest
  sm: "30em",
  md: "48em",
  lg: "62em",
  xl: "80em",
  "2xl": "96em",
});

export default breakpoints;
