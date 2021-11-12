import React, { FC } from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { ProductionType, Valley } from "../../graphql/generated/graphql";
import {
  productionTypeReverseMapping,
  removeNonStringsFromArray,
  valleyReverseMapping,
} from "./utils";

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

  const onSubmit = (data) => {
    const correctedValues = {
      ...data,
      productionType: removeNonStringsFromArray(data.productionType),
    };
    console.log(correctedValues);
  };

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
            max: { value: 1000000, message: "That's a lot of wine" },
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
            max: { value: 2022, message: "Invalid date" },
            min: { value: 0, message: "Thats too old to be true" },
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
      <FormControl>
        <FormLabel htmlFor="valley">Valley</FormLabel>
        <Select selected={Valley.Ensenada} {...register("valley")}>
          {Object.values(Valley).map((valley) => (
            <option key={valley} value={valley}>
              {valleyReverseMapping(valley)}
            </option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel htmlFor="productionType">Production type</FormLabel>
        <VStack justifyContent="start" alignItems="start">
          {Object.values(ProductionType).map((pt, index) => (
            <Checkbox
              key={`productionType.${index}`}
              value={pt}
              {...register(`productionType.${index}`)}
            >
              {productionTypeReverseMapping(pt)}
            </Checkbox>
          ))}
        </VStack>
      </FormControl>

      <Button variant="secondaryWeno" type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </VStack>
  );
};
