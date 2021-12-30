import React, { FC } from "react";
import { useRadio, Box, UseRadioProps, Heading } from "@chakra-ui/react";

const RadioCard: FC<UseRadioProps> = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label" pr={2} pb={2}>
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: "gradient.100",
          color: "white",
          borderColor: "gradient.100",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={5}
        py={3}
        maxW="200px"
        display="flex"
        justifyContent="center"
      >
        <Heading size="xs">{props.children}</Heading>
      </Box>
    </Box>
  );
};

export default RadioCard;
