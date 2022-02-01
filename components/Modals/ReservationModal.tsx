import React, { FC } from "react";
import { useExperienceWithSlotsQuery } from "../../graphql/generated/graphql";
import { Reservation } from "./Reservation";
import { Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation("global");

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
            startDateTime={
              data.experienceWithSlots.experience.slots[0].startDateTime
            }
          />
        )}
      {data?.experienceWithSlots.errors && !fetching && (
        <Heading as="h2" size="sm" color="brand.200" textAlign="center" mt={8}>
          {data?.experienceWithSlots.errors[0].field === "slots"
            ? t("noSlotsAvailable")
            : t("unexpectedError")}
        </Heading>
      )}
      {networkError && !fetching && (
        <Heading as="h2" size="sm" color="brand.200" textAlign="center">
          {t("wrongConnectionToServers")}
        </Heading>
      )}
    </>
  );
};
