import React, { FC } from "react";
import { Box, Grid, Heading } from "@chakra-ui/react";
import BookedExperience from "../Cards/BookedExperience";
import { ReservationFragment } from "../../graphql/generated/graphql";
import { formatDate } from "../Experiences/SampleDates";

interface ReservationsGridProps {
  reservations: ReservationFragment[];
}

const placeHolder =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const ReservationsGrid: FC<ReservationsGridProps> = ({
  reservations,
}) => {
  return (
    <Box mx={[null, null, 10, 20]}>
      <Box maxW="100rem" mt={8}>
        <Heading as="h1" size="xl" mb={4}>
          Your reservation{reservations.length > 1 ? "s" : ""}
        </Heading>
        <Grid
          mt={10}
          gridTemplateColumns="repeat(auto-fit, minmax(274px, 1fr))"
          gap={3}
        >
          {reservations.map((res) => (
            <Box key={res.id}>
              <Heading as="h2" size="sm" mb={4}>
                Booking date: {formatDate(new Date(res.createdAt))}
              </Heading>
              <Heading as="h2" size="sm" mb={4}>
                {res.paymentStatus === "paid" ? "Paid" : "Unpaid"}
              </Heading>
              <BookedExperience
                media={res.getUrl ? res.getUrl : placeHolder}
                title={res.title}
                date={res.startDateTime}
                place={res.wineryName}
                href="#"
                time={res.startDateTime}
                totalPeople={res.noOfAttendees.toString()}
                total={(
                  res.pricePerPersonInDollars * res.noOfAttendees
                ).toString()}
              />
            </Box>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};
