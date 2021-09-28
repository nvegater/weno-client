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
        "with-shadow": {
            bg: "red.400",
            boxShadow: "0 0 2px 2px #efdfde",
        },
        // 4. We can override existing variants
        solid: (props) => ({
            bg: props.colorMode === "dark" ? "red.300" : "red.500",
        }),
    },
};
export default ButtonStyle