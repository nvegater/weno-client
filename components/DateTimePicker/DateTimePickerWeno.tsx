import React, { FC, useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";

// styles are imported in the _app.tsx component
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
  includeTime?: boolean;
}

export const DateTimePickerWeno: FC<DateTimePickerProps> = ({
  onDateTimeSelection,
  initialDate,
  onlyDate = false,
  includeTime = false,
  removeTimeZone = false,
}) => {
  const [dateValue, setDateValue] = useState<Date>(
    initialDate ? initialDate : undefined
  );

  let format: string | undefined;

  if (onlyDate) {
    // This will set the time to 2022-01-05T00:00:00.000Z in the return value of date
    format = "dd/MM/yy";
  }
  if (includeTime) {
    format = "H:mm dd/MM/yy";
  }

  return (
    <DateTimePicker
      onChange={(newValue) => {
        const castedDate = newValue as Date;
        // update local widget value
        setDateValue(castedDate);
        // run custom function if provided
        if (onDateTimeSelection) {
          // if the timezone should be removed pass the ISO string
          onDateTimeSelection(
            removeTimeZone ? isoDateWithoutTimeZone(castedDate) : castedDate
          );
        }
      }}
      value={dateValue}
      disableClock={true}
      format={format}
    />
  );
};
