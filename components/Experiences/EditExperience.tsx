import React, { FC } from "react";
import {
  EditExperienceInputs,
  PaginatedExperienceFragment,
  useEditExperienceMutation,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Img,
  Input,
  Textarea,
  useToast,
  VStack,
} from "@chakra-ui/react";
import {
  mapEventType,
  expTypeToRadioElement,
  valleyReverseMapping,
} from "../utils/enum-utils";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ContextHeader } from "../Authentication/useAuth";
import { getToastMessage } from "../utils/chakra-utils";
import RadioGroup from "../Radio/RadioGroup";
import { concert, degustation, pairing } from "./CreateExperienceForm";

interface EditExperienceInputsForm extends EditExperienceInputs {
  experience: string;
  eventType: string;
}

interface EditExperienceModalProps {
  selectedExperience: PaginatedExperienceFragment;
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

const placeHolderImage =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const EditExperience: FC<EditExperienceModalProps> = ({
  selectedExperience,
  winery,
  contextHeader,
}) => {
  const toast = useToast();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = useForm<EditExperienceInputsForm>({
    mode: "onTouched",
    defaultValues: {
      title: selectedExperience.title,
      description: selectedExperience.description,
      experienceType: selectedExperience.experienceType,
      pricePerPersonInDollars: selectedExperience.pricePerPersonInDollars,
    },
  });
  const [, editExperience] = useEditExperienceMutation();

  const onSubmit = async (data: EditExperienceInputsForm) => {
    const { data: editExperienceResponse, error } = await editExperience(
      {
        editExperienceInputs: {
          experienceId: selectedExperience.id,
          title: data.title,
          description: data.description,
          experienceType: mapEventType(data.eventType),
          pricePerPersonInDollars: data.pricePerPersonInDollars,
        },
      },
      { ...contextHeader, requestPolicy: "network-only" }
    );
    if (error) {
      setError("experience", {
        type: error.name,
        message: error.message,
      });
    }
    if (editExperienceResponse?.editExperience.errors !== null) {
      setError("experience", {
        type: "Field error",
        message:
          editExperienceResponse?.editExperience.errors[0].message ?? "Error",
      });
    }
    if (editExperienceResponse?.editExperience.successfulEdit) {
      toast(getToastMessage("saved"));
      router.reload();
    }
  };

  return (
    <div>
      <Img
        src={
          selectedExperience?.images[0]
            ? selectedExperience.images[0].getUrl
            : placeHolderImage
        }
        alt={"any"}
      />
      <Heading as="h1">{selectedExperience.title}</Heading>
      <Heading as="h2">{valleyReverseMapping(winery.valley)}</Heading>
      <VStack spacing="24px" as="form" onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.title)} isRequired={true}>
          <Input
            type="text"
            placeholder="Title"
            {...register("title", {
              minLength: 3,
              maxLength: 50,
            })}
            maxW="250px"
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.description)} isRequired={true}>
          <Textarea
            type="text"
            placeholder="Describe your event"
            {...register("description", {
              minLength: {
                value: 20,
                message: "Please enter at least 20 characters",
              },
            })}
            maxW="250px"
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.pricePerPersonInDollars)}>
          <FormLabel htmlFor="pricePerPersonInMxn">
            Price per Person in MXN
          </FormLabel>
          <Input
            type="number"
            placeholder="Price per person in MXN"
            {...register("pricePerPersonInDollars", {
              valueAsNumber: true,
            })}
            maxW="250px"
          />
          <FormErrorMessage>
            {errors.pricePerPersonInDollars &&
              errors.pricePerPersonInDollars.message}
          </FormErrorMessage>
        </FormControl>

        <RadioGroup
          control={control}
          name="eventType"
          label="Event type"
          elements={[
            { name: degustation },
            { name: pairing },
            { name: concert },
          ]}
          preSelectedElement={expTypeToRadioElement(
            selectedExperience.experienceType
          )}
          isVisibleLabel
        />

        <Button
          variant="secondaryWeno"
          size="navBarCTA"
          type="submit"
          isLoading={isSubmitting}
          disabled={isSubmitting}
        >
          Save
        </Button>
      </VStack>
    </div>
  );
};
