import React, { FC } from "react";
import {
  Control,
  Controller,
  useFieldArray,
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
  VStack,
} from "@chakra-ui/react";

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
}

export const DateTimeForm: FC<DateTimeFormProps> = ({ control, watch }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "exceptions",
  });
  const watchPeriodic = watch("isPeriodic", "One Time");
  return (
    <VStack justifyContent="start" display="flex" alignItems="start">
      <RadioGroup
        control={control}
        name="isPeriodic"
        label="Recurrent"
        elements={[{ name: "One Time" }, { name: "Periodic" }]}
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

      {watchPeriodic === "Periodic" && (
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
