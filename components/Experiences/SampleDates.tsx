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
import { CombinedError } from "urql";

interface SampleDatesProps {
  dates: string[];
  utcDates: string[];
  error: CombinedError;
}

interface DateWithTimes {
  date: Date;
  times: Date[];
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

const getTimesForDate = (
  onlyDate: Date,
  allCompleteDateTimes: Date[]
): Date[] => {
  return allCompleteDateTimes.filter((dateTime) => {
    const sameYear = dateTime.getFullYear() === onlyDate.getFullYear();
    const sameMonth = onlyDate.getMonth() === dateTime.getMonth();
    const sameDate = dateTime.getDate() === onlyDate.getDate();
    return sameYear && sameMonth && sameDate;
  });
};

export const SampleDates: FC<SampleDatesProps> = ({ dates, error }) => {
  if (error) return <>Error calculating recurrence {JSON.stringify(error)}</>;
  // convert to only Dates without time
  const onlyDateNoTime = dates.map((date) => new Date(date).toDateString());

  // filter out duplicates
  const noDuplicateDates = new Set([...onlyDateNoTime]);

  const printableDateTimes: DateWithTimes[] = [...noDuplicateDates].map(
    (noDuplicateDate) => {
      const dateIgnoreTime = new Date(noDuplicateDate);
      return {
        date: dateIgnoreTime,
        times: getTimesForDate(
          dateIgnoreTime,
          dates.map((d) => new Date(d))
        ),
      };
    }
  );

  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {printableDateTimes.length > 0 &&
        printableDateTimes.map((pDateTime, idx) => {
          const formattedDate = formatDate(pDateTime.date);

          return (
            <AccordionItem key={idx}>
              <h2>
                <AccordionButton>
                  <Box flex="1" textAlign="left">
                    {formattedDate}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {pDateTime.times.length > 0 &&
                  pDateTime.times.map((time) => {
                    const formattedTime = formatDateTime(time);
                    return (
                      <Text key={`${time}-${pDateTime.date}`}>
                        {formattedTime} <br />
                      </Text>
                    );
                  })}
              </AccordionPanel>
            </AccordionItem>
          );
        })}
    </Accordion>
  );
};
