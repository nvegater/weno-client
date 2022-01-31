import { Box, Flex, Grid, StackProps, useRadioGroup } from "@chakra-ui/react";
import * as React from "react";
import { FC } from "react";
import { SlotRadioOption } from "./SlotRadioOption";
import {
  SlotFragmentFragment,
  SlotType,
} from "../../../graphql/generated/graphql";
import { dateFormatterUTC, timeFormatterUTC } from "../../utils/dateTime-utils";
import { parseISO } from "date-fns";

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

  return (
    <Box maxW="100rem">
      <Grid
        gridTemplateColumns="repeat(auto-fit, minmax(200px, 1fr))"
        gap={3}
        overflowY="hidden"
        {...getRootProps(rest)}
      >
        {slots.map((slot) => (
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
