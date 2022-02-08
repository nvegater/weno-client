import React, { FC } from "react";
import {
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  useRadioGroup,
} from "@chakra-ui/react";
import RadioCard from "./RadioCard";
import { Control, useController } from "react-hook-form";

export type RadioElement = { name: string };

const RadioGroup: FC<{
  control: Control<any>;
  label: string;
  elements: RadioElement[];
  name: string;
  isRequired?: boolean;
  isVisibleLabel?: boolean;
  preSelectedElement?: RadioElement;
}> = ({
  control,
  name,
  label,
  isRequired,
  elements,
  preSelectedElement,
  isVisibleLabel = false,
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    defaultValue:
      elements.length > 0
        ? elements[0].name
        : preSelectedElement
        ? preSelectedElement
        : undefined,
    name: name,
    rules: { required: { value: true, message: "Required field" } },
  });
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: field.name,
    onChange: field.onChange,
    value: field.value,
    defaultValue: field.value,
  });

  const group = getRootProps();

  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors[name]} mb={6}>
      <FormLabel
        htmlFor={name}
        visibility={isVisibleLabel ? "visible" : "hidden"}
      >
        {label}
      </FormLabel>
      <Flex {...group} flexDirection={["column", "row"]}>
        {elements.map((value) => {
          const radio = getRadioProps({ value: value.name });
          return (
            <RadioCard key={value.name} {...radio}>
              {value.name}
            </RadioCard>
          );
        })}
      </Flex>
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default RadioGroup;
