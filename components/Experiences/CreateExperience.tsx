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
import { useTranslation } from "react-i18next";

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
    // TODO remove "False" from the Weekday enum
    console.log(data);
  };
  const [t] = useTranslation("global");

  const formSteps: Step[] = [
    {
      title: t("experienceDetails"),
      content: (
        <VStack spacing="24px" mt={4} mb={8}>
          <FormControl isInvalid={errors.title} isRequired={true}>
            <Input
              type="text"
              placeholder={t("title")}
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
              placeholder={t("describeEvent")}
              {...register("description", {
                required: "Please enter a description",
                minLength: {
                  value: 20,
                  message: t("descriptionMessage"),
                },
              })}
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.pricePerPersonInMxn} isRequired={true}>
            <FormLabel htmlFor="pricePerPersonInMxn">{t("price")}</FormLabel>
            <Input
              type="number"
              placeholder={t("howMuch")}
              {...register("pricePerPersonInMxn", {
                valueAsNumber: true,
              })}
            />
            <FormErrorMessage>
              {errors.pricePerPersonInMxn && errors.pricePerPersonInMxn.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={errors.limitOfAttendees} isRequired={true}>
            <FormLabel htmlFor="limitOfAttendees">
              {t("attendeesLimit")}
            </FormLabel>
            <Input
              type="number"
              placeholder="e.g. 1992"
              {...register("limitOfAttendees", {
                valueAsNumber: true,
                max: { value: 2022, message: t("lateDate") },
                min: { value: 0, message: t("earlyDate") },
              })}
            />
            <FormErrorMessage>
              {errors.limitOfAttendees && errors.limitOfAttendees.message}
            </FormErrorMessage>
          </FormControl>
          <RadioGroup
            control={control}
            name="eventType"
            label={t("eventType")}
            elements={[
              { name: t("degustation") },
              { name: t("pairing") },
              { name: t("concert") },
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
      title: t("images"),
      content: <div>Hola</div>,
    },
  ];
  return (
    <VStack as="form" onSubmit={handleSubmit(onSubmit)}>
      <Heading mb={8}>{t("newExperience")}</Heading>
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
        {t("submit")}
      </Button>
    </VStack>
  );
};
