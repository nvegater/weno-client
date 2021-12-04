import React, { FC } from "react";
import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  useRadioGroup,
} from "@chakra-ui/react";
import RadioCard from "./RadioCard";
import { Control, useController } from "react-hook-form";

export type RadioElement = { name: string };
const RadioGroup: FC<{
  control: Control<{ subscription?: string; eventType?: string }>;
  label: string;
  elements: RadioElement[];
  name: "subscription" | "eventType";
  isRequired?: boolean;
  isVisibleLabel?: boolean;
}> = ({
  control,
  name,
  label,
  isRequired,
  elements,
  isVisibleLabel = false,
}) => {
  const {
    field,
    formState: { errors },
  } = useController({
    control,
    name: name,
    rules: { required: { value: true, message: "Required field" } },
  });
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange: field.onChange,
    value: field.value,
    defaultValue: elements.length > 0 ? elements[0].name : null,
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
      <HStack {...group}>
        {elements.map((value) => {
          const radio = getRadioProps({ value: value.name });
          return (
            <RadioCard key={value.name} {...radio}>
              {value.name}
            </RadioCard>
          );
        })}
      </HStack>
      <FormErrorMessage>
        {errors[name] && errors[name].message}
      </FormErrorMessage>
    </FormControl>
  );
};

export default RadioGroup;
