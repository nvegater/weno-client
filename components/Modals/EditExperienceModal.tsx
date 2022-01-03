import React, { FC, useState } from "react";
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

export const EditExperienceModal: FC<EditExperienceModalProps> = ({
  experienceId,
  experiences,
}) => {
  const [date, setDate] = useState<string>(
    formatISO(new Date(), { format: "extended" })
  );

  const selectedExperience: PaginatedExperienceWithSlots | undefined =
    experiences.find((exp) => exp.id === experienceId);

  const slotsFromSelectedExperience: Array<ExperienceSlot> = selectedExperience
    ? selectedExperience.slots
    : [];

  const slotsFromDate = slotsFromSelectedExperience.filter((slot) => {
    const selectedDate = parseISO(date);
    const slotDate = parseISO(slot.startDateTime);
    return isSameDay(slotDate, selectedDate);
  });

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
