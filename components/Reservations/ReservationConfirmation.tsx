import React, { FC } from "react";
import { ReservationFragment } from "../../graphql/generated/graphql";
import BookedExperience from "../Cards/BookedExperience";
import { Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface ReservationProps {
  reservations: ReservationFragment[];
}

const placeHolder =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const ReservationConfirmation: FC<ReservationProps> = ({
  reservations,
}) => {
  const [t] = useTranslation("global");
  return (
    <Flex justifyContent="center" m={5} flexDirection="column">
      <Heading as="h1" size="xl" my={4}>
        {t("thanksForBooking")}
      </Heading>
      <Heading as="h2" size="lg" my={4}>
        {t("yourReservation")}
        {reservations.length > 1 ? t("plural") : ""}:{" "}
      </Heading>
      {reservations.map((res) => (
        <BookedExperience
          key={res.id}
          media={res.getUrl ? res.getUrl : placeHolder}
          title={res.title}
          date={res.startDateTime}
          place={res.wineryName}
          href="#"
          time={res.startDateTime}
          totalPeople={res.noOfAttendees.toString()}
          total={(res.pricePerPersonInDollars * res.noOfAttendees).toString()}
        />
      ))}
    </Flex>
  );
};
