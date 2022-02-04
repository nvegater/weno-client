import React, { FC } from "react";
import {
  Maybe,
  Scalars,
  useExperienceWithSlotsQuery,
} from "../../graphql/generated/graphql";
import { Reservation } from "./Reservation";
import { Heading } from "@chakra-ui/react";
import { parseISO } from "date-fns";

interface ReservationModalProps {
  experienceId: number;
  fromDateTime?: Maybe<Scalars["DateTime"]>;
  untilDateTime?: Maybe<Scalars["DateTime"]>;
}

export const ReservationModal: FC<ReservationModalProps> = ({
  experienceId,
  fromDateTime,
  untilDateTime,
}) => {
  const [{ data, fetching, error: networkError }] = useExperienceWithSlotsQuery(
    {
      variables: {
        experienceWithSlotsInputs: {
          experienceId,
          onlyBookableSlots: true,
          fromDateTime: fromDateTime,
          untilDateTime: untilDateTime,
        },
      },
      requestPolicy: "network-only",
    }
  );

  const sortedSlots = data?.experienceWithSlots.experience
    ? data.experienceWithSlots.experience.slots.sort(function (a, b) {
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return (
          new Date(parseISO(a.startDateTime)).getTime() -
          new Date(parseISO(b.startDateTime)).getTime()
        );
      })
    : [];

  return (
    <>
      {data?.experienceWithSlots.errors == null &&
        data?.experienceWithSlots.experience && (
          <Reservation
            wineryName={data.experienceWithSlots.experience.wineryName}
            valley={data.experienceWithSlots.experience.valley}
            slots={data.experienceWithSlots.experience.slots}
            images={data.experienceWithSlots.experience.images}
            experienceInfo={data.experienceWithSlots.experience}
            startDateTime={sortedSlots[0].startDateTime}
          />
        )}
      {data?.experienceWithSlots.errors && !fetching && (
        <Heading as="h2" size="sm" color="brand.200" textAlign="center" mt={8}>
          {data?.experienceWithSlots.errors[0].field === "slots"
            ? "There are no slots available for this Experience"
            : "An unexpected error occurred in our servers. Please get in touch with us"}
        </Heading>
      )}
      {networkError && !fetching && (
        <Heading as="h2" size="sm" color="brand.200" textAlign="center">
          Oh oh, something is wrong with the network or connection to our
          servers.
        </Heading>
      )}
    </>
  );
};
