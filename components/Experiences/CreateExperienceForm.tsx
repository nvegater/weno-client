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
import { ErrorSummary } from "../Winery/CreateWineryForm";
import RadioGroup from "../Radio/RadioGroup";
import { DateTimeForm } from "./DateTimeForm";
import { useTranslation } from "react-i18next";
import {
  mapEventType,
  mapSlotType,
  removeNonStringsFromArray,
} from "../utils/enum-utils";
import { useRouter } from "next/router";

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

export const CreateExperienceForm: FC<CreateExperienceProps> = ({
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

  const router = useRouter();

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
      router.reload();
    }
  };
  const [t] = useTranslation("global");

  const formSteps: Step[] = [
    {
      title: t("experienceDetails"),
      content: (
        <VStack spacing="24px">
          <FormControl isInvalid={errors.title} isRequired={true}>
            <Input
              type="text"
              placeholder={t("title")}
              {...register("title", {
                required: { value: true, message: t("titleDescription") },
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
              placeholder={t("describeEvent")}
              {...register("description", {
                required: { value: true, message: t("descriptionText") },
                minLength: {
                  value: 20,
                  message: t("descriptionMessage"),
                },
              })}
              maxW="250px"
            />
            <FormErrorMessage>
              {errors.description && errors.description.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.pricePerPersonInMxn} isRequired={true}>
            <FormLabel htmlFor="pricePerPersonInMxn">{t("price")}</FormLabel>
            <Input
              type="number"
              placeholder={t("price")}
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
            <FormLabel htmlFor="limitOfAttendees">
              {t("attendeesLimit")}
            </FormLabel>
            <Input
              type="number"
              {...register("limitOfAttendees", {
                valueAsNumber: true,
                max: { value: 2022, message: t("lateDate") },
                min: { value: 0, message: t("earlyDate") },
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
            label={t("eventType")}
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
      title: t("datesFrequency"),
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
  ];

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      display="flex"
      pr={4}
      alignItems={["start", "center"]}
    >
      <Heading mb={8}>{t("newExperience")}</Heading>
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
          {t("submit")}
        </Button>
      </Flex>
    </VStack>
  );
};
