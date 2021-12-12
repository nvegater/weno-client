import React, { FC } from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Text,
} from "@chakra-ui/react";
import { DateWithTimesFragment } from "../../graphql/generated/graphql";

interface SampleDatesProps {
  datesWithTimes: DateWithTimesFragment[];
}

function formatDateTime(date: Date) {
  const timePart = date.toLocaleTimeString();
  return timePart.substring(0, timePart.length - 3);
}

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "2-digit",
    year: "numeric",
  });
}

export const SampleDates: FC<SampleDatesProps> = ({ datesWithTimes }) => {
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {datesWithTimes.length > 0 &&
        datesWithTimes.map((pDateTime, idx) => (
          <AccordionItem key={idx}>
            <h2>
              <AccordionButton>
                <Box flex="1" textAlign="left">
                  {formatDate(new Date(pDateTime.date))}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              {pDateTime.times.length > 0 &&
                pDateTime.times.map((time) => (
                  <Text key={`${time}-${pDateTime.date}`}>
                    {formatDateTime(new Date(time))} <br />
                  </Text>
                ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
};
