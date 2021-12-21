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

export function isoDateWithoutTimeZone(date: Date) {
  const timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
  const correctDate = new Date(timestamp);
  return correctDate.toISOString();
}

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

  const enable__Exceptions__messages_Recurrent__dateFormat_inverted__calculateRecursion =
    watchPeriodic === recurrent;
  const setAutoDuration = watchPeriodic === oneTime;
  const disable__Duration_StartTime_EndDateTime__setAutoDuration =
    watchPeriodic === allDay;

  const [fetchRecurrentDates, setFetchRecurrentDates] =
    useState<boolean>(false);

  const startDateTime = new Date(watchStartDate);
  const endDateTime = new Date(watchEndDate);
  const recurrentDatesInputs: CreateRecurrentDatesInputs = {
    startDate: startDateTime,
    endDate: endDateTime,
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
    if (setAutoDuration) {
      const diff = differenceInMinutes(
        new Date(watchEndDate),
        new Date(watchStartDate)
      );
      setValue("durationInMinutes", diff);
    }
    if (disable__Duration_StartTime_EndDateTime__setAutoDuration) {
      setValue("durationInMinutes", 24 * 60);
    }
  }, [
    watchStartDate,
    watchEndDate,
    setAutoDuration,
    setValue,
    disable__Duration_StartTime_EndDateTime__setAutoDuration,
  ]);

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
      <HStack>
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
            >
              <FormLabel htmlFor="startDateTime">Start</FormLabel>
              <DateTimePickerWeno
                onDateTimeSelection={(date) => {
                  field.onChange(isoDateWithoutTimeZone(date));
                }}
                onlyDate={
                  disable__Duration_StartTime_EndDateTime__setAutoDuration
                }
              />
              <FormErrorMessage>
                {fieldState.error && fieldState.error.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        {!disable__Duration_StartTime_EndDateTime__setAutoDuration && (
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
                  onDateTimeSelection={(date) => {
                    field.onChange(isoDateWithoutTimeZone(date));
                  }}
                  endDatePeriodic={
                    enable__Exceptions__messages_Recurrent__dateFormat_inverted__calculateRecursion
                  }
                />
                <FormErrorMessage>
                  {fieldState.error && fieldState.error.message}
                </FormErrorMessage>
              </FormControl>
            )}
          />
        )}
      </HStack>
      {!disable__Duration_StartTime_EndDateTime__setAutoDuration && (
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
                  {enable__Exceptions__messages_Recurrent__dateFormat_inverted__calculateRecursion
                    ? "Duration in minutes (for each event)"
                    : "Duration in minutes"}
                </FormLabel>
                <Input
                  type="number"
                  placeholder={
                    setAutoDuration
                      ? "Select Start & End to display duration"
                      : "e.g. 60"
                  }
                  onChange={field.onChange}
                  name={field.name}
                  value={field.value}
                  ref={field.ref}
                  isReadOnly={setAutoDuration}
                />
                <FormErrorMessage>
                  {fieldState.error && fieldState.error.message}
                </FormErrorMessage>
              </FormControl>
            );
          }}
        />
      )}

      {enable__Exceptions__messages_Recurrent__dateFormat_inverted__calculateRecursion && (
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
            Add {customDateField.length > 0 ? "another" : "a"} custom date
          </Button>
          {customDateField.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`customDates.${index}.value`}
              render={({ field }) => (
                <HStack>
                  <DateTimePickerWeno
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
            Add {customExceptionField.length > 0 ? "another" : "an"} exception
          </Button>

          {customExceptionField.map((field, index) => (
            <Controller
              key={field.id}
              control={control}
              name={`exceptions.${index}.value`}
              render={({ field }) => (
                <HStack>
                  <DateTimePickerWeno
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
