import React, { FC } from "react";
import { useExperienceWithSlotsQuery } from "../../graphql/generated/graphql";
import { ExperienceModalLayout } from "./ExperienceModalLayout";

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
  return (
    <>
      {data && data.experienceWithSlots.experience && (
        <ExperienceModalLayout
          experienceTitle={data.experienceWithSlots.experience.title}
          wineryName={data.experienceWithSlots.experience.winery.name}
          wineryValley={data.experienceWithSlots.experience.winery.valley}
          images={data.experienceWithSlots.experience.images}
        />
      )}
    </>
  );
};
