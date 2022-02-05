import React, { FC } from "react";
import {
  EditWineryInputs,
  useEditWineryInfoMutation,
  WineryFragmentFragment,
} from "../../../graphql/generated/graphql";
import { ContextHeader } from "../../Authentication/useAuth";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Heading,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { Step, VerticalSteps } from "../../VerticalSteps/VerticalSteps";
import { ErrorSummary } from "../../RegisterWinery/CreateWineryForm";
import { useForm } from "react-hook-form";
import { getToastMessage } from "../../utils/chakra-utils";

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

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<EditWineryInputsForm>({
    mode: "onTouched",
    defaultValues: { description: winery.description },
  });
  const [, editWinery] = useEditWineryInfoMutation();

  const onSubmit = async (data: EditWineryInputs) => {
    const { data: editWineryResponse, error } = await editWinery(
      {
        editWineryInputs: {
          wineryId: winery.id,
          description: data.description,
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
        message: editWineryResponse.editWinery.errors[0].message,
      });
    }
    if (editWineryResponse?.editWinery.winery) {
      toast(getToastMessage("winerySaved"));
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
