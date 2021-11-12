import React, { FC } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";

interface CreateWineryFormProps {
  username: string;
  email: string;
}

export const CreateWineryForm: FC<CreateWineryFormProps> = ({
  username,
  email,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  console.log(errors);
  const onSubmit = (data) => console.log(data);

  console.log("Use when submitting the form", username, email);

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading>Your Winery</Heading>
      <FormControl isInvalid={errors.name}>
        <Input
          type="text"
          placeholder="Winery Name"
          {...register("name", {
            required: "Please enter the name of your winery",
            minLength: 3,
            maxLength: 50,
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.description}>
        <Textarea
          type="text"
          placeholder="How would you describe your winery..."
          {...register("description", {
            required: "Please enter a description",
            minLength: { value: 20, message: "A bit longer please" },
          })}
        />
        <FormErrorMessage>
          {errors.description && errors.description.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.yearlyWineProduction}>
        <FormLabel htmlFor="yearlyWineProduction">
          Yearly wine production
        </FormLabel>
        <Input
          type="number"
          placeholder="How many Liters per year"
          {...register("yearlyWineProduction", {
            valueAsNumber: true,
            maxLength: { value: 7, message: "Please enter a valid year" },
          })}
        />
        <FormErrorMessage>
          {errors.yearlyWineProduction && errors.yearlyWineProduction.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={errors.foundationYear}>
        <FormLabel htmlFor="foundationYear">Foundation year</FormLabel>
        <Input
          type="number"
          placeholder="e.g. 1992"
          {...register("foundationYear", {
            valueAsNumber: true,
            maxLength: { value: 4, message: "Please enter a valid year" },
            minLength: { value: 4, message: "Please enter a valid year" },
          })}
        />
        <FormErrorMessage>
          {errors.foundationYear && errors.foundationYear.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="googleMapsUrl">Location</FormLabel>
        <Input
          type="text"
          placeholder="Google maps link"
          {...register("googleMapsUrl")}
        />
      </FormControl>

      <Button
        variant="secondaryWeno"
        type="submit"
        isLoading={isSubmitting}
        mt={4}
      >
        Submit
      </Button>
    </VStack>
  );
};
