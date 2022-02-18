import React from "react";
import useAuth from "../../components/Authentication/useAuth";
import { WenoLayout } from "../../components/GeneralLayout/WenoLayout";
import { useRouter } from "next/router";
import useVerifySession from "../../components/Authentication/useVerifySession";
import { Flex, Heading, Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../graphql/urqlProvider";
import { ReservationConfirmation } from "../../components/Reservations/ReservationConfirmation";
import { useTranslation } from "react-i18next";

const Success = () => {
  const router = useRouter();

  const { session_id } = router.query;

  const { authenticated, logout, login, tokenInfo, urlAlias } = useAuth();
  const [t] = useTranslation("global");

  const {
    loadingVerification,
    verificationError,
    isVerified,
    retryVerificationLink,
    reservations,
  } = useVerifySession({
    sessionId: session_id === undefined ? null : session_id,
  });

  return (
    <WenoLayout
      loginFn={login}
      logoutFn={logout}
      authenticated={authenticated}
      tokenInfo={tokenInfo}
      urlAlias={urlAlias}
    >
      {loadingVerification && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            {t("receivingBookingInformation")}
          </Heading>
        </Flex>
      )}
      {verificationError && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            {t("notValidSession")}
          </Heading>
        </Flex>
      )}
      {retryVerificationLink && (
        <Heading>
          {t("incompleteBooking")}
          <Link href={retryVerificationLink}>{t("here")}</Link>
        </Heading>
      )}
      {isVerified && (
        <Flex justifyContent="center" m={5}>
          <ReservationConfirmation reservations={reservations} />
        </Flex>
      )}
    </WenoLayout>
  );
};

export default withUrqlClient(createUrqlClient, {
  ssr: true,
  // disable ssr for cypress to mock the requests ssr: process.env.APP_ENV !== "cy-test",
})(Success);
