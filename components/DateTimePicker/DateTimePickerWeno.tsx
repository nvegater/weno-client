import React, { FC, useState } from "react";
import DatePicker from "react-datepicker";

export function isoDateWithoutTimeZone(date: Date) {
  // TODO MAybe replace with https://date-fns.org/v2.28.0/docs/formatISO
  const timestamp = date.getTime() - date.getTimezoneOffset() * 60000;
  const correctDate = new Date(timestamp);
  return correctDate.toISOString();
}

interface DateTimePickerProps {
  onDateTimeSelection?: (date: Date | string) => void;
  initialDate?: Date;
  removeTimeZone?: boolean;
  onlyDate?: boolean;
  isEndDateTimeRecurrent?: boolean;
}

export const DateTimePickerWeno: FC<DateTimePickerProps> = ({
  onDateTimeSelection,
  initialDate,
  onlyDate = false,
  isEndDateTimeRecurrent = false,
  removeTimeZone = false,
}) => {
  const [dateValue, setDateValue] = useState<Date>(
    initialDate ? initialDate : undefined
  );

  let format: string = "yyyy MMM d, h:mm aa";

  if (onlyDate) {
    format = "yyyy MMM d";
  }
  if (isEndDateTimeRecurrent) {
    format = "h:mm aa, d MMM yy ";
  }

  const onChange = (newValue: Date) => {
    // update local widget value
    setDateValue(newValue);
    // run custom function if provided
    if (onDateTimeSelection) {
      // if the timezone should be removed pass the ISO string
      onDateTimeSelection(
        removeTimeZone ? isoDateWithoutTimeZone(newValue) : newValue
      );
    }
  };

  return (
    <DatePicker
      selected={dateValue}
      onChange={onChange}
      showTimeSelect={isEndDateTimeRecurrent || !onlyDate}
      dateFormat={format}
      timeFormat="HH:mm"
      timeIntervals={15}
    />
  );
};
