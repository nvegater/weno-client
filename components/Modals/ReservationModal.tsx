import React, { FC } from "react";
import { useExperienceWithSlotsQuery } from "../../graphql/generated/graphql";
import { ExperienceModalLayout } from "./ExperienceModalLayout";
import { Heading } from "@chakra-ui/react";

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

  return (
    <>
      {data?.experienceWithSlots.errors == null &&
        data?.experienceWithSlots.experience && (
          <ExperienceModalLayout
            experienceWineryInfo={data.experienceWithSlots.experience.winery}
            slots={data.experienceWithSlots.experience.slots}
            images={data.experienceWithSlots.experience.images}
            experienceInfo={data.experienceWithSlots.experience}
            startDateTime={
              data.experienceWithSlots.experience.slots[0].startDateTime
            }
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
