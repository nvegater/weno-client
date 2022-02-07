import React, { FC } from "react";
import { PaginatedExperienceFragment } from "../../graphql/generated/graphql";
import { Reservation } from "./Reservation";
import { parseISO } from "date-fns";

interface ReservationModalProps {
  experience: PaginatedExperienceFragment;
}

export const ReservationModal: FC<ReservationModalProps> = ({ experience }) => {
  const sortedSlots = experience
    ? experience.slots.sort(function (a, b) {
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
      {experience && (
        <Reservation
          wineryName={experience.wineryName}
          valley={experience.valley}
          slots={sortedSlots}
          images={experience.images}
          experienceInfo={experience}
        />
      )}
    </>
  );
};
