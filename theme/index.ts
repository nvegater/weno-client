// theme/index.js
import { extendTheme } from "@chakra-ui/react"
// Global style overrides
import styles from "./styles"
// Foundational style overrides
import breakpoints from "./foundations/breakpoints";
// Component style overrides
import Button from "./components/button"



const overrides = {
    ...styles,
    // Other foundational style overrides go here
    breakpoints,
    components: {
        Button,
        // Other components go here
    },
}
export default extendTheme(overrides)