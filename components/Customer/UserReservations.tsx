import React, { FC } from "react";
import { ContextHeader } from "../Authentication/useAuth";
import { useCustomerReservationsQuery } from "../../graphql/generated/graphql";
import { ReservationsGrid } from "../Reservations/ReservationsGrid";
import { useTranslation } from "react-i18next";

interface UserReservationsProps {
  email: string;
}

export const UserReservations: FC<UserReservationsProps> = ({ email }) => {
  const [{ data, fetching, error }] = useCustomerReservationsQuery({
    variables: { email },
  });
  const [t] = useTranslation("global");

  return (
    <>
      {error && <div>{t("errorLoading")}</div>}
      {fetching && <div>{t("loading")}</div>}
      {data?.getCustomerReservations.reservations && (
        <ReservationsGrid
          reservations={data.getCustomerReservations.reservations}
        />
      )}
    </>
  );
};
