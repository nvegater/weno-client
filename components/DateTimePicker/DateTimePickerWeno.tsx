import React, { FC, useEffect, useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
// styles are imported in the _app.tsx component

interface DateTimePickerProps {
  onDateTimeSelection: (date: Date) => void;
  initialDate?: Date;
}

export const DateTimePickerWeno: FC<DateTimePickerProps> = ({
  onDateTimeSelection,
  initialDate,
}) => {
  const [dateValue, setDateValue] = useState<Date>(
    initialDate ? initialDate : new Date()
  );

  useEffect(() => {
    onDateTimeSelection(dateValue);
  }, [onDateTimeSelection, dateValue]);

  return (
    <DateTimePicker
      onChange={(newValue) => {
        const castedDate = newValue as Date;
        setDateValue(castedDate);
      }}
      value={dateValue}
      disableClock={true}
    />
  );
};
