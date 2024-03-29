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
import { useTranslation } from "react-i18next";

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
    defaultValue: preSelectedElement
      ? preSelectedElement.name
      : elements.length > 0
      ? elements[0].name
      : undefined,
    name: name,
    rules: { required: { value: true, message: "This field is required" } },
  });
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: field.name,
    onChange: field.onChange,
    value: field.value,
    defaultValue: field.value,
  });
  const [t] = useTranslation("global");
  const group = getRootProps();

  return (
    <FormControl isRequired={isRequired} isInvalid={!!errors[name]} mb={6}>
      <FormLabel
        htmlFor={name}
        visibility={isVisibleLabel ? t("visible") : t("hidden")}
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
