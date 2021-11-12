import {
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { BsPeopleFill } from "react-icons/bs";

interface BlogProps {
  input: number;
}

const NumberBox = (props: BlogProps) => {
  const { input } = props;
  const [value, setValue] = useState(input);

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
  return <NumberBox input={0} />;
};
