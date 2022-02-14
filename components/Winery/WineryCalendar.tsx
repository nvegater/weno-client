import React, { FC, useMemo } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import dayGridPlugin from "@fullcalendar/daygrid";
import { Flex, Heading } from "@chakra-ui/react";
import {
  SlotType,
  useReservedSlotsQuery,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";

interface WineryCalendarProps {
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

export const WineryCalendar: FC<WineryCalendarProps> = ({
  winery,
  contextHeader,
}) => {
  const [{ data, error, fetching }] = useReservedSlotsQuery({
    variables: { wineryId: winery.id },
    context: contextHeader,
  });

  const slotsReserved = useMemo(
    () =>
      data &&
      data.reservedSlots.slotReservations &&
      !error &&
      data.reservedSlots.errors == undefined
        ? data.reservedSlots.slotReservations.map((exp, idx) => {
            return {
              title: exp.reservations[0].title,
              start: exp.slot.startDateTime,
              end: exp.slot.endDateTime,
              resourceId: idx,
              allDay: exp.slot.slotType === SlotType.AllDay,
            };
          })
        : [],
    [data, error]
  );

  return (
    <div>
      <Flex>
        <Heading as="h1" size="xl" mb={5}>
          Upcoming Events
        </Heading>
      </Flex>
      {fetching && (
        <Heading as="h1" size="md" mb={5}>
          Loading events...
        </Heading>
      )}
      {slotsReserved.length > 0 && (
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
          initialEvents={slotsReserved}
          eventBackgroundColor="#9F449D"
        />
      )}
    </div>
  );
};
