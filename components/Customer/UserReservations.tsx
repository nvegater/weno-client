import React, { FC } from "react";
import { ContextHeader } from "../Authentication/useAuth";
import { useCustomerReservationsQuery } from "../../graphql/generated/graphql";
import { ReservationsGrid } from "../Reservations/ReservationsGrid";

interface UserReservationsProps {
  contextHeader: ContextHeader;
  email: string;
}

export const UserReservations: FC<UserReservationsProps> = ({
  email,
  contextHeader,
}) => {
  const [{ data, fetching, error }] = useCustomerReservationsQuery({
    variables: { email },
    context: contextHeader,
  });

  return (
    <>
      {error && <div>Error</div>}
      {fetching && <div>Loading</div>}
      {data?.getCustomerReservations.reservations && (
        <ReservationsGrid
          reservations={data.getCustomerReservations.reservations}
        />
      )}
    </>
  );
};
