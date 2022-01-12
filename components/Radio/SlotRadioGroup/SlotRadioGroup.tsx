import { Grid, StackProps, useRadioGroup, Box, Flex } from "@chakra-ui/react";
import * as React from "react";
import { SlotRadioOption } from "./SlotRadioOption";
import {
  SlotFragmentFragment,
  SlotType,
} from "../../../graphql/generated/graphql";
import { dateFormatterUTC, timeFormatterUTC } from "../../utils/dateTime-utils";
import { parseISO } from "date-fns";
import { FC, useMemo } from "react";
function formatSlotDates(
  slotType: SlotType,
  startDateTime: string,
  endDateTime: string
) {
  const startDate = parseISO(startDateTime);
  const endDate = parseISO(endDateTime);

  if (slotType === SlotType.OneTime) {
    return `${dateFormatterUTC.format(
      startDate
    )} from ${timeFormatterUTC.format(startDate)} to ${timeFormatterUTC.format(
      endDate
    )}`;
  } else if (slotType === SlotType.AllDay) {
    return `${dateFormatterUTC.format(startDate)} - All day`;
  } else {
    return `${timeFormatterUTC.format(startDate)} - ${timeFormatterUTC.format(
      endDate
    )}`;
  }
}
interface RadioGroupProps extends Omit<StackProps, "onChange"> {
  name: string;
  onChange: (value: string) => void;
  slots: SlotFragmentFragment[];
}

export const SlotRadioGroup: FC<RadioGroupProps> = ({
  name,
  slots,
  onChange,
  ...rest
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    name,
    onChange,
    defaultValue: slots[0].startDateTime,
  });

  const sortedSlots = useMemo(
    () =>
      slots.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (
          new Date(parseISO(a.startDateTime)).getTime() -
          new Date(parseISO(b.startDateTime)).getTime()
        );
      }),
    [slots]
  );

  return (
    <Box maxW="100rem">
      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={3}
        overflowY="hidden"
        {...getRootProps(rest)}
      >
        {sortedSlots.map((slot) => (
          <Flex justifyContent="center" key={slot.id}>
            <SlotRadioOption {...getRadioProps({ value: slot.startDateTime })}>
              {formatSlotDates(
                slot.slotType,
                slot.startDateTime,
                slot.endDateTime
              )}
            </SlotRadioOption>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};
