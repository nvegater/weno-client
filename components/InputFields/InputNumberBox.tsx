import {
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";

export const InputNumberBox = () => {
  const [value, setValue] = useState(1);

  return (
    <HStack maxW="180px">
      <Button
        color="white"
        backgroundColor="brand.300"
        onClick={() => setValue(value <= 1 ? 1 : value - 1)}
      >
        -
      </Button>
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <BsPeopleFill color="#BE5050" />
        </InputLeftElement>
        <Input value={value} />
      </InputGroup>
      <Button
        color="white"
        backgroundColor="brand.300"
        onClick={() => setValue(value + 1)}
      >
        +
      </Button>
    </HStack>
  );
};
