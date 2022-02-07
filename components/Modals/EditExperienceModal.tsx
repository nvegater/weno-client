import React, { FC, useEffect, useMemo, useState } from "react";
import {
  PaginatedExperienceFragment,
  SlotFragmentFragment,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import { DateTimePickerWeno } from "../DateTimePicker/DateTimePickerWeno";
import { formatISO, isSameDay, parseISO } from "date-fns";
import { Heading, Img } from "@chakra-ui/react";
import { valleyReverseMapping } from "../utils/enum-utils";
import { SlotRadioGroup } from "../Radio/SlotRadioGroup/SlotRadioGroup";

interface EditExperienceModalProps {
  selectedExperience: PaginatedExperienceFragment;
  winery: WineryFragmentFragment;
}

export function getSlotsFromDate(
  slots: Array<SlotFragmentFragment>,
  date: string
) {
  return slots.filter((slot) => {
    const selectedDate = parseISO(date);
    const slotDate = parseISO(slot.startDateTime);
    return isSameDay(slotDate, selectedDate);
  });
}

const placeHolderImage =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const EditExperienceModal: FC<EditExperienceModalProps> = ({
  selectedExperience,
  winery,
}) => {
  const [date, setDate] = useState<string>(
    formatISO(new Date(), { format: "extended" })
  );

  const slotsFromDate: SlotFragmentFragment[] = useMemo(() => {
    if (selectedExperience) {
      const sortedSlots = selectedExperience.slots.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (
          new Date(parseISO(a.startDateTime)).getTime() -
          new Date(parseISO(b.startDateTime)).getTime()
        );
      });
      return getSlotsFromDate(sortedSlots, date);
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
            initialDate={parseISO(selectedExperience.slots[0].startDateTime)}
            onDateTimeSelection={(date) => {
              setDate(date as string);
            }}
          />
        </>
      )}

      {slotsFromDate.length > 0 && (
        <SlotRadioGroup
          name="rating"
          slots={slotsFromDate}
          onChange={(slotDateTimeStart) => console.log(slotDateTimeStart)}
        />
      )}
    </div>
  );
};
