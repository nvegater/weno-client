// theme/index.js
import { extendTheme } from "@chakra-ui/react";
// Global style overrides
import styles from "./styles";
// Foundational style overrides
import breakpoints from "./foundations/breakpoints";
// Component style overrides
import Button from "./components/button";

// https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/foundations

const overrides = {
  ...styles,
  // Other foundational style overrides go here
  breakpoints,
  components: {
    Button,
    // Other components go here
  },
};
export default extendTheme(overrides);
