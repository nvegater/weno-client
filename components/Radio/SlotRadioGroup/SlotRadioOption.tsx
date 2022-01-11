import {
  Square,
  SquareProps,
  useId,
  useRadio,
  UseRadioProps,
} from "@chakra-ui/react";
import * as React from "react";

export interface RadioOptionProps
  extends UseRadioProps,
    Omit<SquareProps, "onChange"> {}

export const SlotRadioOption = (props: RadioOptionProps) => {
  const { getInputProps, getCheckboxProps, getLabelProps, state } =
    useRadio(props);
  const id = useId();

  return (
    <label {...getLabelProps()}>
      <input {...getInputProps()} aria-labelledby={id} />
      <Square
        id={id}
        rounded="lg"
        fontWeight="bold"
        p={4}
        borderWidth="1px"
        transition="all 0.2s"
        cursor="pointer"
        bg="brand.500"
        opacity={state.isChecked ? "" : "70%"}
        _hover={{
          bg: "gray.100",
        }}
        _active={{
          bg: "brand.500",
          opacity: "0%",
        }}
        _checked={{
          bg: "red.500",
          color: "white",
        }}
        _focus={{ shadow: "outline" }}
        {...getCheckboxProps(props)}
      />
    </label>
  );
};
