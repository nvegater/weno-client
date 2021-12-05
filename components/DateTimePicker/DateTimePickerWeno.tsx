import React, { FC, useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
// styles are imported in the _app.tsx component

interface DateTimePickerProps {
  onDateTimeSelection?: (date: Date) => void;
  initialDate?: Date;
}

export const DateTimePickerWeno: FC<DateTimePickerProps> = ({
  onDateTimeSelection,
  initialDate,
}) => {
  const [dateValue, setDateValue] = useState<Date>(
    initialDate ? initialDate : new Date()
  );

  return (
    <DateTimePicker
      onChange={(newValue) => {
        const castedDate = newValue as Date;
        if (onDateTimeSelection) onDateTimeSelection(castedDate);
        setDateValue(castedDate);
      }}
      value={dateValue}
      disableClock={true}
    />
  );
};
