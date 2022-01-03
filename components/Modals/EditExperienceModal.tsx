import React, { FC, useEffect, useMemo, useState } from "react";
import {
  ExperienceSlot,
  PaginatedExperienceWithSlots,
  SlotType,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import { DateTimePickerWeno } from "../DateTimePicker/DateTimePickerWeno";
import { formatISO, isSameDay, parseISO } from "date-fns";
import { Heading, Img } from "@chakra-ui/react";
import { valleyReverseMapping } from "../utils/enum-utils";
import {
  dateFormatter,
  dateFormatterSimple,
  timeFormatter,
} from "../utils/dateTime-utils";

interface EditExperienceModalProps {
  experienceId: number;
  experiences: PaginatedExperienceWithSlots[];
  winery: WineryFragmentFragment;
}

function getSlotsFromDate(slots: Array<ExperienceSlot>, date: string) {
  return slots.filter((slot) => {
    const selectedDate = parseISO(date);
    const slotDate = parseISO(slot.startDateTime);
    return isSameDay(slotDate, selectedDate);
  });
}

function getExperienceById(
  experiences: PaginatedExperienceWithSlots[],
  experienceId: number
) {
  return experiences.find((exp) => exp.id === experienceId);
}

function formatSlotDates(
  slotType: SlotType,
  startDateTime: string,
  endDateTime: string
) {
  if (slotType === SlotType.OneTime) {
    return `${dateFormatterSimple.format(
      parseISO(startDateTime)
    )} from ${timeFormatter.format(
      parseISO(startDateTime)
    )} to ${timeFormatter.format(parseISO(endDateTime))}`;
  } else if (slotType === SlotType.AllDay) {
    return `${dateFormatter.format(parseISO(startDateTime))} - All day`;
  } else {
    return `${timeFormatter.format(
      parseISO(startDateTime)
    )} - ${timeFormatter.format(parseISO(endDateTime))}`;
  }
}

const placeHolderImage =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const EditExperienceModal: FC<EditExperienceModalProps> = ({
  experienceId,
  experiences,
  winery,
}) => {
  const [date, setDate] = useState<string>(
    formatISO(new Date(), { format: "extended" })
  );

  const selectedExperience: PaginatedExperienceWithSlots | undefined = useMemo(
    () => getExperienceById(experiences, experienceId),
    [experienceId, experiences]
  );

  const slotsFromDate: ExperienceSlot[] = useMemo(() => {
    if (selectedExperience) {
      return getSlotsFromDate(selectedExperience.slots, date);
    } else {
      return [];
    }
  }, [date, selectedExperience]);

  useEffect(() => {
    if (selectedExperience) {
      setDate(selectedExperience.slots[0].startDateTime);
    }
  }, [selectedExperience]);

  return (
    <div>
      <Img src={placeHolderImage} alt={"any"} />
      <Heading as="h1">{selectedExperience.title}</Heading>
      <Heading as="h2">{valleyReverseMapping(winery.valley)}</Heading>
      {selectedExperience.slots.length > 1 && (
        <>
          <Heading as="h3">Select a date</Heading>
          <DateTimePickerWeno
            removeTimeZone={true}
            onlyDate={true}
            onDateTimeSelection={(date) => {
              setDate(date as string);
            }}
          />
        </>
      )}

      {slotsFromDate.length > 0 && (
        <>
          {slotsFromDate.map((slot) => {
            return (
              <div key={slot.id}>
                {formatSlotDates(
                  slot.slotType,
                  slot.startDateTime,
                  slot.endDateTime
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};
