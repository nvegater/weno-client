import {
  HStack,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import React, { FC, useEffect, useState } from "react";
import { BsPeopleFill } from "react-icons/bs";

interface InputNumberBoxProps {
  onValueUpdate?: (value: number) => void;
}

export const InputNumberBox: FC<InputNumberBoxProps> = ({ onValueUpdate }) => {
  const [value, setValue] = useState(1);

  useEffect(() => {
    if (onValueUpdate) {
      onValueUpdate(value);
    }
  }, [onValueUpdate, value]);

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
