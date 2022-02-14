import { SlotFragmentFragment } from "../../graphql/generated/graphql";
import { isSameDay, parseISO } from "date-fns";

// https://nodejs.org/docs/latest-v12.x/api/intl.html
export const timeFormatter = Intl.DateTimeFormat("en", {
  minute: "2-digit",
  hour: "2-digit",
});
export const dateFormatter = Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});

export const timeFormatterUTC = Intl.DateTimeFormat("en", {
  minute: "2-digit",
  hour: "2-digit",
  timeZone: "UTC",
});

export const dateFormatterUTC = Intl.DateTimeFormat("en", {
  dateStyle: "medium",
  timeZone: "UTC",
});

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

export function minMaxDates(slots: Array<SlotFragmentFragment>): [Date, Date] {
  const dates = slots.map((slot) => {
    return new Date(slot.startDateTime);
  });

  const minDate = new Date(Math.min.apply(null, dates));
  const maxDate = new Date(Math.max.apply(null, dates));

  return [minDate, maxDate];
}
