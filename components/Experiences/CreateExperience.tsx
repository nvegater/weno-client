import React, { FC } from "react";
import {
  CreateExperienceInputs,
  CreateRecurrentDatesInputs,
  useCreateExperienceMutation,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { Step, VerticalSteps } from "../VerticalSteps/VerticalSteps";
import { ErrorSummary } from "../RegisterWinery/CreateWineryForm";
import RadioGroup from "../Radio/RadioGroup";
import { DateTimeForm } from "./DateTimeForm";
import {
  mapEventType,
  mapSlotType,
  removeNonStringsFromArray,
} from "../utils/enum-utils";
import { atom, useSetRecoilState } from "recoil";
import {
  generatorNavigationState,
  GeneratorSubpage,
} from "../Profile/Winery/GeneratorLayout/GeneratorLayout";

interface CreateExperienceProps {
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

export const oneTime = "One Time";
export const recurrent = "Periodic";
export const allDay = "All day";

export const degustation = "Degustation";
export const pairing = "Pairing";
export const concert = "Concert";

export const createdExperienceIdState = atom<number | null>({
  key: "createdExperienceId",
  default: null,
});

export const CreateExperience: FC<CreateExperienceProps> = ({
  winery,
  contextHeader,
}) => {
  const {
    register,
    setError,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });

  const setCreatedExperienceId = useSetRecoilState(createdExperienceIdState);
  const setSubpage = useSetRecoilState(generatorNavigationState);

  const [, createExperience] = useCreateExperienceMutation();
  const onSubmit = async (data) => {
    const experienceInputs: CreateExperienceInputs = {
      wineryId: winery.id,
      title: data.title,
      description: data.description,
      limitOfAttendees: data.limitOfAttendees,
      typeOfEvent: mapEventType(data.eventType),
      pricePerPersonInDollars: data.pricePerPersonInMxn,
    };
    const recurrenceInputs: CreateRecurrentDatesInputs = {
      startDate: data.startDateTime,
      endDate: data.endDateTime,
      durationInMinutes: parseInt(data.durationInMinutes),
      slotType: mapSlotType(data.typeOfSlot),
      customDates:
        data.customDates && data.customDates.length > 0
          ? data.customDates.map((d) => new Date(d.value))
          : undefined,
      exceptions:
        data.exceptions && data.exceptions.length > 0
          ? data.exceptions.map((d) => new Date(d.value))
          : undefined,
      exceptionDays:
        data.exceptionDays &&
        removeNonStringsFromArray(data.exceptionDays).length > 0
          ? removeNonStringsFromArray(data.exceptionDays)
          : undefined,
    };
    const { data: result, error } = await createExperience(
      {
        createExperienceInputs: experienceInputs,
        createRecurrentDatesInputs: recurrenceInputs,
      },
      { ...contextHeader, requestPolicy: "network-only" }
    );
    if (error) {
      setError("submit", {
        type: error.name,
        message: error.message,
      });
    }
    if (result && result.createExperience.errors !== null) {
      setError(result.createExperience.errors[0].field, {
        type: "Field error",
        message: result?.createExperience.errors[0].message,
      });
    }
    if (result && result.createExperience.experience !== null) {
      setCreatedExperienceId(result.createExperience.experience.id);
      setSubpage(GeneratorSubpage.EDIT_EXPERIENCE);
    }
  };

  const formSteps: Step[] = [
    {
      title: "Experience Details",
      content: (
        <VStack spacing="24px">
          <FormControl isInvalid={errors.title} isRequired={true}>
            <Input
              type="text"
              placeholder="Title"
              {...register("title", {
                required: "Please enter the title of your event",
                minLength: 3,
                maxLength: 50,
              })}
              maxW="250px"
            />
            <FormErrorMessage>
              {errors.title && errors.title.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.description} isRequired={true}>
            <Textarea
              type="text"
              placeholder="Describe your event"
              {...register("description", {
                required: "Please enter a description",
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

          <FormControl isInvalid={errors.pricePerPersonInMxn} isRequired={true}>
            <FormLabel htmlFor="pricePerPersonInMxn">
              Price per Person
            </FormLabel>
            <Input
              type="number"
              placeholder="Price per person in MXN"
              {...register("pricePerPersonInMxn", {
                valueAsNumber: true,
              })}
              maxW="250px"
            />
            <FormErrorMessage>
              {errors.pricePerPersonInMxn && errors.pricePerPersonInMxn.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.limitOfAttendees} isRequired={true}>
            <FormLabel htmlFor="limitOfAttendees">Limit of attendees</FormLabel>
            <Input
              type="number"
              placeholder="e.g. 1992"
              {...register("limitOfAttendees", {
                valueAsNumber: true,
                max: { value: 2022, message: "Invalid date" },
                min: { value: 0, message: "Thats too old to be true" },
              })}
              maxW="250px"
            />
            <FormErrorMessage>
              {errors.limitOfAttendees && errors.limitOfAttendees.message}
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
            isRequired
            isVisibleLabel
          />
        </VStack>
      ),
    },
    {
      title: "Dates and frequency",
      content: (
        <DateTimeForm
          control={control}
          watch={watch}
          setValue={setValue}
          register={register}
          contextHeader={contextHeader}
        />
      ),
    },
    {
      title: "Images",
      content: (
        <Flex>
          <Heading as="h3" size="sm">
            Submit the form to upload images
          </Heading>
        </Flex>
      ),
    },
  ];

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      alignItems="start"
      pr={4}
    >
      <Heading mb={8}>New Experience</Heading>
      <Box mb={"3em"}>
        <VerticalSteps
          steps={formSteps}
          isLoading={false}
          finalStepText="Click reset to verify your creation"
        />
      </Box>

      <FormControl
        isInvalid={Boolean(errors)}
        display="flex"
        justifyContent="center"
        flexDir="column"
      >
        <FormErrorMessage>
          <ErrorSummary errors={errors} />
        </FormErrorMessage>
      </FormControl>
      <Box w="100%">
        <Flex justifyContent="center" flexDir="column">
          <Button
            variant="secondaryWeno"
            size="navBarCTA"
            type="submit"
            isLoading={isSubmitting}
            disabled={isSubmitting}
          >
            Submit
          </Button>
        </Flex>
      </Box>
    </VStack>
  );
};
