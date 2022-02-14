import React, { FC } from "react";
import {
  EditWineryInputs,
  ProductionType,
  useEditWineryInfoMutation,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Step, VerticalSteps } from "../VerticalSteps/VerticalSteps";
import { ErrorSummary } from "./CreateWineryForm";
import { useForm } from "react-hook-form";
import { getToastMessage } from "../utils/chakra-utils";
import { productionTypeReverseMapping } from "../utils/enum-utils";
import { useRouter } from "next/router";

interface EditWineryInputsForm extends EditWineryInputs {
  winery: string;
}

interface EditWineryInfoProps {
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

export const EditWineryInfo: FC<EditWineryInfoProps> = ({
  contextHeader,
  winery,
}) => {
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditWineryInputsForm>({
    mode: "onTouched",
    defaultValues: {
      description: winery.description,
      yearlyWineProduction: winery.yearlyWineProduction,
      foundationYear: winery.foundationYear,
      googleMapsUrl: winery.googleMapsUrl ?? "",
    },
  });
  const [, editWinery] = useEditWineryInfoMutation();

  const onSubmit = async (data: EditWineryInputs) => {
    const { data: editWineryResponse, error } = await editWinery(
      {
        editWineryInputs: {
          wineryId: winery.id,
          description: data.description,
          yearlyWineProduction: data.yearlyWineProduction,
          foundationYear: data.foundationYear,
          googleMapsUrl: data.googleMapsUrl,
        },
      },
      { ...contextHeader, requestPolicy: "network-only" }
    );
    if (error) {
      setError("winery", {
        type: error.name,
        message: error.message,
      });
    }
    if (editWineryResponse?.editWinery.errors !== null) {
      setError("winery", {
        type: "Field error",
        message: editWineryResponse?.editWinery.errors[0].message ?? "Error",
      });
    }
    if (editWineryResponse?.editWinery.winery) {
      toast(getToastMessage("saved"));
      router.reload();
    }
  };

  const formSteps: Step[] = [
    {
      title: "General",
      content: (
        <VStack spacing="24px" mt={4} mb={8}>
          <FormControl isInvalid={Boolean(errors.description)}>
            <Textarea
              type="text"
              placeholder="How would you describe your winery..."
              {...register("description", {
                required: "Please enter a description",
                value: winery.description,
                minLength: {
                  value: 20,
                  message: "Please enter at least 20 characters",
                },
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={Boolean(errors.yearlyWineProduction)}>
            <FormLabel htmlFor="yearlyWineProduction">
              Yearly wine production in liters per year
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
          <FormControl isInvalid={Boolean(errors.foundationYear)}>
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
            <FormLabel htmlFor="googleMapsUrl" visibility="hidden">
              Google maps url
            </FormLabel>
            <Input
              type="text"
              placeholder="Google maps link"
              {...register("googleMapsUrl")}
            />
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
  ];
  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading mb={8}>Edit your winery</Heading>
      <Box mb={"3em"}>
        <VerticalSteps steps={formSteps} isLoading={false} />
      </Box>
      <Flex justifyContent="center" alignItems="center" flexDir="column">
        <Box>
          <FormControl isInvalid={Boolean(errors)}>
            <FormErrorMessage>
              <ErrorSummary errors={errors} />
            </FormErrorMessage>
          </FormControl>
        </Box>
        <Button
          variant="secondaryWeno"
          size="navBarCTA"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Save
        </Button>
      </Flex>
    </VStack>
  );
};
