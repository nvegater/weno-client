import React, { FC, useEffect, useState } from "react";
import {
  Control,
  Controller,
  useFieldArray,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import RadioGroup from "../Radio/RadioGroup";
import { DateTimePickerWeno } from "../DateTimePicker/DateTimePickerWeno";
import {
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { allDay, oneTime, recurrent } from "./CreateExperience";
import { differenceInMinutes } from "date-fns";
import {
  mapSlotType,
  removeNonStringsFromArray,
  weekdaysReverseMapping,
} from "../utils/enum-utils";
import {
  CreateRecurrentDatesInputs,
  useRecurrentDatesQuery,
} from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { SampleDates } from "./SampleDates";
import { BsFillEyeFill } from "react-icons/bs";

type WeekdayStr = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";
const weekdaysArray: WeekdayStr[] = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

interface DateTimeFormProps {
  control: Control<any>;
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  register: UseFormRegister<any>;
  contextHeader: ContextHeader;
}

export const DateTimeForm: FC<DateTimeFormProps> = ({
  control,
  watch,
  setValue,
  register,
  contextHeader,
}) => {
  const {
    fields: customExceptionField,
    append: appendException,
    remove: removeException,
  } = useFieldArray({
    control,
    name: "exceptions",
  });

  const {
    fields: customDateField,
    append: appendCustomDate,
    remove: removeCustomDate,
  } = useFieldArray({
    control,
    name: "customDates",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const watchPeriodic = watch("typeOfSlot", oneTime);
  const watchEndDate = watch("endDateTime");
  const watchStartDate = watch("startDateTime");
  const watchDuration = watch("durationInMinutes");
  const watchCustomDates = watch("customDates");
  const watchExceptions = watch("exceptions");
  const watchExceptionDays = watch("exceptionDays");

  // allow calculating recursion and set endDate special format
  const isRecurrent = watchPeriodic === recurrent;

  const isAutomaticDuration = watchPeriodic === oneTime;
  const isAllDay = watchPeriodic === allDay;

  const [fetchRecurrentDates, setFetchRecurrentDates] =
    useState<boolean>(false);

  const recurrentDatesInputs: CreateRecurrentDatesInputs = {
    startDate: watchStartDate,
    endDate: watchEndDate,
    durationInMinutes: parseInt(watchDuration),
    slotType: mapSlotType(watchPeriodic),
    customDates:
      watchCustomDates && watchCustomDates.length > 0
        ? watchCustomDates.map((d) => new Date(d.value))
        : undefined,
    exceptions:
      watchExceptions && watchExceptions.length > 0
        ? watchExceptions.map((d) => new Date(d.value))
        : undefined,
    exceptionDays:
      watchExceptionDays &&
      removeNonStringsFromArray(watchExceptionDays).length > 0
        ? removeNonStringsFromArray(watchExceptionDays)
        : undefined,
  };
  const [{ data: recDatesQuery, error, fetching }] = useRecurrentDatesQuery({
    variables: {
      createRecurrentDatesInputs: recurrentDatesInputs,
    },
    context: contextHeader,
    requestPolicy: "network-only",
    pause: !fetchRecurrentDates,
  });

  useEffect(() => {
    if (isAutomaticDuration && watchStartDate && watchEndDate) {
      const diff = differenceInMinutes(
        new Date(watchEndDate),
        new Date(watchStartDate)
      );
      setValue("durationInMinutes", diff);
    }
    if (isAllDay && watchStartDate) {
      setValue("durationInMinutes", 24 * 60);
      // it gets ignored anyway because is "allDay
      setValue("endDateTime", watchStartDate);
    }
  }, [watchStartDate, watchEndDate, isAutomaticDuration, setValue, isAllDay]);

  useEffect(() => {
    setFetchRecurrentDates(false);
  }, [recDatesQuery]);

  return (
    <VStack justifyContent="start" display="flex" alignItems="start">
      <RadioGroup
        control={control}
        name="typeOfSlot"
        label="Recurrent"
        elements={[{ name: oneTime }, { name: recurrent }, { name: allDay }]}
      />
      <Flex
        flexDirection={["column", "row"]}
        justifyContent={["start", "space-between"]}
      >
        <Controller
          control={control}
          rules={{
            required: { value: true, message: "You need a start date" },
          }}
          name="startDateTime"
          render={({ field, fieldState }) => (
            <FormControl
              isRequired={true}
              isInvalid={Boolean(fieldState.error)}
              pr={2}
              pb={2}
            >
              <FormLabel htmlFor="startDateTime">Start</FormLabel>
              <DateTimePickerWeno
                removeTimeZone={true}
                onDateTimeSelection={(date) => {
                  // remove timezone is True so we pass only a string
                  field.onChange(date);
                }}
                onlyDate={isAllDay}
              />
              <FormErrorMessage>
                {fieldState.error && fieldState.error.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        {!isAllDay && (
          <Controller
            control={control}
            name="endDateTime"
            rules={{
              required: { value: true, message: "You need an end date" },
            }}
            render={({ field, fieldState }) => (
              <FormControl
                isRequired={true}
                isInvalid={Boolean(fieldState.error)}
              >
                <FormLabel htmlFor="endDateTime">End</FormLabel>
                <DateTimePickerWeno
                  removeTimeZone={true}
                  onDateTimeSelection={(date) => {
                    field.onChange(date);
                  }}
                  isEndDateTimeRecurrent={isRecurrent}
                />
                <FormErrorMessage>
                  {fieldState.error && fieldState.error.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        )}
      </Flex>
      {!isAllDay && (
        <Controller
          control={control}
          name="durationInMinutes"
          defaultValue={0}
          rules={{
            required: { value: true, message: "You need a duration" },
            max: { value: 100000, message: "Your event is too long." },
            min: { value: 1, message: "Thats not a valid duration" },
          }}
          render={({ field, fieldState }) => {
            return (
              <FormControl
                isInvalid={Boolean(fieldState.error)}
                isRequired={true}
              >
                <FormLabel htmlFor="durationInMinutes">
                  {isRecurrent
                    ? "Duration in minutes (for each event)"
                    : isAutomaticDuration
                    ? "Automatic duration (use start and end)"
                    : "Duration in minutes"}
                </FormLabel>
                <Input
                  type="number"
                  placeholder={isAutomaticDuration ? "Disabled" : "e.g. 60"}
                  onChange={field.onChange}
                  name={field.name}
                  value={field.value}
                  ref={field.ref}
                  isReadOnly={isAutomaticDuration}
                  maxW="250px"
                />
                <FormErrorMessage>
                  {fieldState.error && fieldState.error.message}
                </FormErrorMessage>
              </FormControl>
            );
          }}
        />
      )}

      {isRecurrent && (
        <VStack
          justifyContent="start"
          display="flex"
          alignItems="start"
          py={5}
          spacing={8}
        >
          <Button
            onClick={() => {
              appendCustomDate({ customDates: "customDates" });
            }}
            variant="secondaryWeno"
            size="navBarCTA"
          >
            Custom dates
          </Button>
          {customDateField.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`customDates.${index}.value`}
              render={({ field }) => (
                <HStack>
                  <DateTimePickerWeno
                    removeTimeZone={true}
                    onDateTimeSelection={(date) => {
                      field.onChange(date);
                    }}
                  />
                  <Button
                    onClick={() => {
                      removeCustomDate(index);
                    }}
                  >
                    Remove
                  </Button>
                </HStack>
              )}
            />
          ))}

          <Button
            onClick={() => {
              appendException({ exceptions: "exceptions" });
            }}
            variant="secondaryWeno"
            size="navBarCTA"
          >
            Exceptions
          </Button>

          {customExceptionField.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`exceptions.${index}.value`}
              render={({ field }) => (
                <HStack>
                  <DateTimePickerWeno
                    removeTimeZone={true}
                    onDateTimeSelection={(date) => {
                      field.onChange(date);
                    }}
                  />
                  <Button
                    onClick={() => {
                      removeException(index);
                    }}
                  >
                    Remove
                  </Button>
                </HStack>
              )}
            />
          ))}

          <FormControl>
            <FormLabel htmlFor="exceptionDays" fontWeight="bold">
              Exclude this days
            </FormLabel>
            <VStack justifyContent="start" alignItems="start">
              {weekdaysArray.map((wd, index) => (
                <Checkbox
                  key={`exceptionDays.${index}`}
                  value={wd}
                  {...register(`exceptionDays.${index}`)}
                >
                  {weekdaysReverseMapping(wd)}
                </Checkbox>
              ))}
            </VStack>
          </FormControl>
          <Button
            onClick={() => {
              setFetchRecurrentDates(true);
              onOpen();
            }}
            isLoading={fetching}
            variant="secondaryWeno"
            size="heroWeno"
            rightIcon={<BsFillEyeFill />}
          >
            Preview Dates
          </Button>
        </VStack>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {recDatesQuery &&
              recDatesQuery.recurrentDates &&
              recDatesQuery.recurrentDates && (
                <SampleDates
                  datesWithTimes={recDatesQuery.recurrentDates.dateWithTimes}
                />
              )}
            {error && <Text>Select a valid recursion</Text>}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};
