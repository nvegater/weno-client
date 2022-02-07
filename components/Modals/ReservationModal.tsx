import React, { FC } from "react";
import { PaginatedExperienceFragment } from "../../graphql/generated/graphql";
import { Reservation } from "./Reservation";

interface ReservationModalProps {
  experience: PaginatedExperienceFragment;
}

export const ReservationModal: FC<ReservationModalProps> = ({ experience }) => {
  return (
    <>
      {experience && (
        <Reservation
          wineryName={experience.wineryName}
          valley={experience.valley}
          slots={experience.slots}
          images={experience.images}
          experienceInfo={experience}
        />
      )}
    </>
  );
};
