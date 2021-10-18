// theme/index.js
import { extendTheme } from "@chakra-ui/react";
// Global style overrides
import styles from "./styles";
// Foundational style overrides
import breakpoints from "./foundations/breakpoints";
import fonts from "./fonts/fonts";
// Component style overrides
import Button from "./components/button";
import Card from "./components/card";

// https://github.com/chakra-ui/chakra-ui/tree/main/packages/theme/src/foundations

const overrides = {
  ...styles,
  // Other foundational style overrides go here
  fonts,
  breakpoints,
  components: {
    Button,
    Card,
  },
};
export default extendTheme(overrides);
