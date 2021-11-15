import {
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";

const NumberBox = () => {
  const [value, setValue] = useState(0);

  const incrementNumber = () => {
    let newValue = value + 1;
    setValue(newValue);
  };

  const decrementNumber = () => {
    let newValue = value - 1;
    setValue(newValue);
  };

  return (
    <HStack maxW="180px">
      <Button
        color="white"
        backgroundColor="brand.300"
        onClick={() => decrementNumber()}
      >
        -
      </Button>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<BsPeopleFill color="#BE5050" />}
        />
        <Input value={value} />
      </InputGroup>
      <Button
        color="white"
        backgroundColor="brand.300"
        onClick={() => incrementNumber()}
      >
        +
      </Button>
    </HStack>
  );
};

export const InputNumberBox = () => {
  return <NumberBox />;
};
