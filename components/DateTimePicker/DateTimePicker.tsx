import React, { FC, useState } from "react";
import DateTimePicker from "react-datetime-picker/dist/entry.nostyle";
// styles are imported in the _app.tsx component

interface DateTimePickerProps {}

export const DateTimePickerWeno: FC<DateTimePickerProps> = ({}) => {
  const [value, onChange] = useState(new Date());

  console.log(value);

  return (
    <DateTimePicker
      onChange={(value) => onChange(value)}
      value={value}
      disableClock={true}
    />
  );
};
