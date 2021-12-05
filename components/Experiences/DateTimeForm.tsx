import React, { FC } from "react";
import { Control, UseFormWatch } from "react-hook-form";
import RadioGroup from "../Radio/RadioGroup";
import { DateTimePickerWeno } from "../DateTimePicker/DateTimePickerWeno";
import { Controller } from "react-hook-form";

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
  const watchPeriodic = watch("isPeriodic", "Periodic");
  return (
    <>
      <RadioGroup
        control={control}
        name="isPeriodic"
        label="Recurrent"
        elements={[{ name: "Periodic" }, { name: "One Time" }]}
      />
      {watchPeriodic === "Periodic" && <div>Hola</div>}
      <Controller
        control={control}
        name="startDateTime"
        render={({ field }) => (
          <DateTimePickerWeno
            onDateTimeSelection={(date) => {
              field.onChange(date);
            }}
            initialDate={new Date(2020, 0, 2)}
          />
        )}
      />
    </>
  );
};
