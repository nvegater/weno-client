import React, { FC } from "react";
import { Control } from "react-hook-form";

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
  control: Control<DateTimeFormSubmitProps>;
}

export const DateTimeForm: FC<DateTimeFormProps> = ({}) => {
  return <div>Hola</div>;
};
