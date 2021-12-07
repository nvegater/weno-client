import React, { FC, useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
// styles are imported in the _app.tsx component

interface DateTimePickerProps {
  onDateTimeSelection?: (date: Date) => void;
  initialDate?: Date;
  onlyDate?: boolean;
  endDatePeriodic?: boolean;
}

export const DateTimePickerWeno: FC<DateTimePickerProps> = ({
  onDateTimeSelection,
  initialDate,
  onlyDate = false,
  endDatePeriodic = false,
}) => {
  const [dateValue, setDateValue] = useState<Date>(
    initialDate ? initialDate : undefined
  );

  let format: string | undefined;

  if (onlyDate) {
    format = "dd/MM/yy";
  }
  if (endDatePeriodic) {
    format = "H:mm dd/MM/yy";
  }

  return (
    <DateTimePicker
      onChange={(newValue) => {
        const castedDate = newValue as Date;
        if (onDateTimeSelection) onDateTimeSelection(castedDate);
        setDateValue(castedDate);
      }}
      value={dateValue}
      disableClock={true}
      format={format}
    />
  );
};
