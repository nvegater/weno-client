import React, { FC } from "react";
import {
  useRadioGroup,
  HStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
} from "@chakra-ui/react";
import RadioCard from "./RadioCard";
import { useController, Control } from "react-hook-form";
import {
  BASIC_SUBSCRIPTION_NAME,
  INTERMEDIATE_SUBSCRIPTION_NAME,
  PREMIUM_SUBSCRIPTION_NAME,
} from "../RegisterWinery/CreateWineryForm";

const RadioGroup: FC<{
  control: Control<{ subscription: string }>;
  label: string;
  name: "subscription";
  isRequired?: boolean;
}> = ({ control, name, label, isRequired }) => {
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
  });

  const group = getRootProps();

  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors[name]} mb={6}>
      <FormLabel htmlFor={name} visibility="hidden">
        {label}
      </FormLabel>
      <HStack {...group}>
        {[
          { name: BASIC_SUBSCRIPTION_NAME },
          { name: INTERMEDIATE_SUBSCRIPTION_NAME },
          { name: PREMIUM_SUBSCRIPTION_NAME },
        ].map((value) => {
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