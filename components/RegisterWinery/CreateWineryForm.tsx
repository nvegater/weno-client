import React, { FC } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import {
  Box,
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
import {
  ProductionType,
  TypeWine,
  useCreateWineryMutation,
  Valley,
} from "../../graphql/generated/graphql";
import {
  productionTypeReverseMapping,
  removeNonStringsFromArray,
  valleyReverseMapping,
  wineTypeReverseMapping,
} from "./utils";
import { ContextHeader } from "../Authentication/useAuth";
import { Step, VerticalSteps } from "../VerticalSteps/VerticalSteps";
import { ErrorMessage } from "@hookform/error-message";

interface CreateWineryFormProps {
  username: string;
  email: string;
  contextHeader: ContextHeader;
}
type ErrorSummaryProps<T> = {
  errors: FieldErrors<T>;
};

function ErrorSummary<T>({ errors }: ErrorSummaryProps<T>) {
  if (Object.keys(errors).length === 0) {
    return null;
  }
  return (
    <div className="error-summary">
      {Object.keys(errors).map((fieldName) => (
        <ErrorMessage
          errors={errors}
          name={fieldName as any}
          as="div"
          key={fieldName}
        />
      ))}
    </div>
  );
}

export const CreateWineryForm: FC<CreateWineryFormProps> = ({
  username,
  email,
  contextHeader,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const [, createWinery] = useCreateWineryMutation();

  const onSubmit = async (data) => {
    const correctedValues = {
      ...data,
      productionType: removeNonStringsFromArray(data.productionType),
      wineType: removeNonStringsFromArray(data.wineType),
    };
    await createWinery(
      {
        userInputs: { email, username },
        createWineryInputs: { ...correctedValues },
      },
      { ...contextHeader, requestPolicy: "network-only" }
    );
  };

  const formSteps: Step[] = [
    {
      title: "General",
      content: (
        <VStack spacing="24px" mt={4} mb={8}>
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
              {errors.yearlyWineProduction &&
                errors.yearlyWineProduction.message}
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
        </VStack>
      ),
    },
    {
      title: "Location",
      content: (
        <VStack spacing="24px" mt={4} mb={8}>
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
        </VStack>
      ),
    },
    {
      title: "Production types",
      content: (
        <VStack spacing="24px" mb={8}>
          <FormControl>
            <FormLabel htmlFor="productionType" visibility="hidden">
              Production type
            </FormLabel>
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
        </VStack>
      ),
    },
    {
      title: "Wine types",
      content: (
        <VStack spacing="24px" mb={8}>
          <FormControl>
            <FormLabel htmlFor="wineType" visibility="hidden">
              Wine type
            </FormLabel>
            <VStack justifyContent="start" alignItems="start">
              {Object.values(TypeWine).map((tw, index) => (
                <Checkbox
                  key={`wineType.${index}`}
                  value={tw}
                  {...register(`wineType.${index}`)}
                >
                  {wineTypeReverseMapping(tw)}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
        </VStack>
      ),
    },
    {
      title: "COVID-19 Safety Measures",
      content: (
        <FormControl mb={8}>
          <FormLabel htmlFor="covidLabel" visibility="hidden">
            COVID-19 Safety Measures
          </FormLabel>
          <Checkbox {...register(`covidLabel`)}>
            We comply with the safety measures from the WHO
          </Checkbox>
        </FormControl>
      ),
    },
  ];

  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading mb={8}>Your Winery</Heading>
      <Box mb={"3em"}>
        <VerticalSteps steps={formSteps} isLoading={false} />
      </Box>

      <ErrorSummary errors={errors} />

      <Button
        variant="secondaryWeno"
        type="submit"
        isLoading={isSubmitting}
        mt={"3em"}
        disabled={isSubmitting}
      >
        Submit
      </Button>
    </VStack>
  );
};
