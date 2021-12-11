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
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { allDay, oneTime, recurrent } from "./CreateExperience";
import { differenceInMinutes } from "date-fns";
import { weekdaysReverseMapping } from "../RegisterWinery/utils";
import { useRecurrentDatesQuery } from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { SampleDates } from "./SampleDates";

type WeekdayStr = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";
const weekdaysArray: WeekdayStr[] = ["MO", "TU", "WE", "TH", "FR", "SA", "SU"];

type DateTimeFormSubmitProps = {
  startDateTime: Date;
  endDateTime: Date;
  intervalInMinutes: number;
  daysOfTheWeek: WeekdayStr[];
  isPeriodic: boolean;
  isSameDayRepetition: boolean;
  customExcludedDates?: Date[];
  customAddedDates?: Date[];
};

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
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exceptions",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const watchPeriodic = watch("isPeriodic", oneTime);
  const watchEndDate = watch("endDateTime");
  const watchStartDate = watch("startDateTime");
  const watchDuration = watch("durationInMinutes");
  //const watchExceptions = watch("exceptions");
  //const watchExceptionDays = watch("exceptionDays");

  const enable__Exceptions__messages_Recurrent__dateFormat_inverted__calculateRecursion =
    watchPeriodic === recurrent;
  const setAutoDuration = watchPeriodic === oneTime;
  const disable__Duration_StartTime_EndDateTime__setAutoDuration =
    watchPeriodic === allDay;

  useEffect(() => {
    if (setAutoDuration) {
      const diff = differenceInMinutes(watchEndDate, watchStartDate);
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

  const [fetchRecurrentDates, setFetchRecurrentDates] =
    useState<boolean>(false);

  const startDateTime = new Date(watchStartDate);
  const endDateTime = new Date(watchEndDate);
  const [{ data: recDatesQuery, error, fetching }] = useRecurrentDatesQuery({
    variables: {
      createRecurrentDatesInputs: {
        startDate: startDateTime,
        endDate: endDateTime,
        durationInMinutes: parseInt(watchDuration),
      },
    },
    context: contextHeader,
    requestPolicy: "network-only",
    pause: !fetchRecurrentDates,
  });

  useEffect(() => {
    setFetchRecurrentDates(false);
  }, [recDatesQuery]);

  return (
    <VStack justifyContent="start" display="flex" alignItems="start">
      <RadioGroup
        control={control}
        name="isPeriodic"
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
                  field.onChange(date);
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
                    field.onChange(date);
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
        <VStack justifyContent="start" display="flex" alignItems="start" py={5}>
          <Button
            onClick={() => {
              append({ exceptions: "exceptions" });
            }}
            variant="secondaryWeno"
            size="navBarCTA"
          >
            Add {fields.length > 0 ? "another" : "an"} exception
          </Button>

          {fields.map((field, index) => (
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
                    onlyDate={true}
                  />
                  <Button
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    Remove
                  </Button>
                </HStack>
              )}
            />
          ))}
        </VStack>
      )}
      {enable__Exceptions__messages_Recurrent__dateFormat_inverted__calculateRecursion && (
        <VStack spacing="24px" mb={8}>
          <FormControl>
            <FormLabel htmlFor="exceptionDays" fontWeight="bold">
              Not this days
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
        </VStack>
      )}

      <Button
        onClick={() => {
          setFetchRecurrentDates(true);
          onOpen();
        }}
      >
        Preview Dates
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {recDatesQuery && !fetching && (
              <SampleDates
                dates={recDatesQuery.recurrentDates.dates}
                utcDates={recDatesQuery.recurrentDates.utcDates}
                error={error}
              />
            )}
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
