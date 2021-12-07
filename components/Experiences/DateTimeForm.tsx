import React, { FC, useEffect } from "react";
import {
  Control,
  Controller,
  useFieldArray,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import RadioGroup from "../Radio/RadioGroup";
import { DateTimePickerWeno } from "../DateTimePicker/DateTimePickerWeno";
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { oneTime, recurrent } from "./CreateExperience";
import { differenceInMinutes } from "date-fns";

type WeekdayStr = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU";

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
}

export const DateTimeForm: FC<DateTimeFormProps> = ({
  control,
  watch,
  setValue,
}) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exceptions",
  });
  const watchPeriodic = watch("isPeriodic", oneTime);
  const watchEndDate = watch("startDateTime");
  const watchStartDate = watch("endDateTime");

  const disableDuration = watchPeriodic === oneTime;
  useEffect(() => {
    if (disableDuration) {
      const diff = differenceInMinutes(watchStartDate, watchEndDate);
      setValue("durationInMinutes", diff);
    }
  }, [watchStartDate, watchEndDate, disableDuration, setValue]);
  return (
    <VStack justifyContent="start" display="flex" alignItems="start">
      <RadioGroup
        control={control}
        name="isPeriodic"
        label="Recurrent"
        elements={[{ name: oneTime }, { name: recurrent }]}
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
              />
              <FormErrorMessage>
                {fieldState.error && fieldState.error.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />

        <Controller
          control={control}
          name="endDateTime"
          rules={{ required: { value: true, message: "You need an end date" } }}
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
              />
              <FormErrorMessage>
                {fieldState.error && fieldState.error.message}
              </FormErrorMessage>
            </FormControl>
          )}
        />
      </HStack>
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
          console.log(field.value);
          return (
            <FormControl
              isInvalid={Boolean(fieldState.error)}
              isRequired={true}
            >
              <FormLabel htmlFor="durationInMinutes">
                Duration in minutes
              </FormLabel>
              <Input
                type="number"
                placeholder="e.g. 60"
                onChange={field.onChange}
                name={field.name}
                value={field.value}
                ref={field.ref}
                isReadOnly={disableDuration}
              />
              <FormErrorMessage>
                {fieldState.error && fieldState.error.message}
              </FormErrorMessage>
            </FormControl>
          );
        }}
      />

      {watchPeriodic === recurrent && (
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
    </VStack>
  );
};
