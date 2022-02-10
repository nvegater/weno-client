import React, { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

interface WineryCalendarProps {}

export const WineryCalendar: FC<WineryCalendarProps> = ({}) => {
  return (
    <FullCalendar
      plugins={[timeGridPlugin, interactionPlugin]}
      editable
      selectable
    />
  );
};
