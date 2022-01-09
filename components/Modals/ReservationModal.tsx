import React, { FC } from "react";
import { useExperienceWithSlotsQuery } from "../../graphql/generated/graphql";

interface ReservationModalProps {
  experienceId: number;
}

export const ReservationModal: FC<ReservationModalProps> = ({
  experienceId,
}) => {
  const [{ data, fetching, error: networkError }] = useExperienceWithSlotsQuery(
    {
      variables: { experienceId, onlyBookableSlots: true },
      requestPolicy: "network-only",
    }
  );
  console.log(data);
  return <div>Hola</div>;
};
