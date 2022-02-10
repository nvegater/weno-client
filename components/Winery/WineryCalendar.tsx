import React, { FC } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Flex, Heading } from "@chakra-ui/react";

interface WineryCalendarProps {}

export const WineryCalendar: FC<WineryCalendarProps> = ({}) => {
  return (
    <div>
      <Flex>
        <Heading as="h1" size="xl" mb={5}>
          Upcoming Events
        </Heading>
      </Flex>
      <FullCalendar
        plugins={[interactionPlugin, timeGridPlugin, dayGridPlugin]}
        editable
        selectable
        headerToolbar={{
          left: "dayGridMonth,timeGridWeek,timeGridDay",
          center: "title",
          right: "today,prev,next",
        }}
        initialView="timeGridWeek"
        nowIndicator={true}
        height="1000px"
        timeZone="UTC"
        scrollTime={"06:00:00"}
      />
    </div>
  );
};
