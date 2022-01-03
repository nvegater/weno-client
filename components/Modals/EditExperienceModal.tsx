import React, { FC, useEffect, useMemo, useState } from "react";
import {
  ExperienceSlot,
  PaginatedExperienceWithSlots,
} from "../../graphql/generated/graphql";
import { DateTimePickerWeno } from "../DateTimePicker/DateTimePickerWeno";
import { formatISO, isSameDay, parseISO } from "date-fns";
import { Heading } from "@chakra-ui/react";

interface EditExperienceModalProps {
  experienceId: number;
  experiences: PaginatedExperienceWithSlots[];
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

export const EditExperienceModal: FC<EditExperienceModalProps> = ({
  experienceId,
  experiences,
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
      <DateTimePickerWeno
        removeTimeZone={true}
        onlyDate={true}
        onDateTimeSelection={(date) => {
          setDate(date as string);
        }}
      />
      {slotsFromDate.length > 0 &&
        slotsFromDate.map((slot) => {
          return (
            <>
              <Heading>{slot.slotType}</Heading>
              {slot.startDateTime} - {slot.endDateTime}
            </>
          );
        })}
    </div>
  );
};
