import React, { FC } from "react";
import { WineryFragmentFragment } from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
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

interface CreateExperienceProps {
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

export const oneTime = "One Time";
export const recurrent = "Periodic";
export const allDay = "All day";

export const CreateExperience: FC<CreateExperienceProps> = ({
  winery,
  contextHeader,
}) => {
  const {
    register,
    //setError,
    watch,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onTouched" });
  console.log(winery, contextHeader);
  const onSubmit = async (data) => {
    // TODO convert event type value to Backend Enum
    // TODO convert periodic field to enum
    console.log(data);
  };

  const formSteps: Step[] = [
    {
      title: "Experience Details",
      content: (
        <VStack spacing="24px" mt={4} mb={8}>
          <FormControl isInvalid={errors.title} isRequired={true}>
            <Input
              type="text"
              placeholder="Title"
              {...register("title", {
                required: "Please enter the title of your event",
                minLength: 3,
                maxLength: 50,
              })}
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
              placeholder="How much per person in MXN ?"
              {...register("pricePerPersonInMxn", {
                valueAsNumber: true,
              })}
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
              { name: "Degustation" },
              { name: "Pairing" },
              { name: "Concert" },
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
        <DateTimeForm control={control} watch={watch} setValue={setValue} />
      ),
    },
    {
      title: "Images",
      content: <div>Hola</div>,
    },
  ];
  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading mb={8}>New Experience</Heading>
      <Box mb={"3em"}>
        <VerticalSteps steps={formSteps} isLoading={false} />
      </Box>

      <FormControl
        isInvalid={Boolean(errors)}
        display="flex"
        justifyContent="center"
      >
        <FormErrorMessage>
          <ErrorSummary errors={errors} />
        </FormErrorMessage>
      </FormControl>

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
