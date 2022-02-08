import React from "react";
import useAuth from "../../components/Authentication/useAuth";
import { WenoLayout } from "../../components/GeneralLayout/WenoLayout";
import { useRouter } from "next/router";
import useVerifySession from "../../components/Authentication/useVerifySession";
import { Flex, Heading, Link } from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../graphql/urqlProvider";
import { ReservationConfirmation } from "../../components/Reservations/ReservationConfirmation";

const Success = () => {
  const router = useRouter();

  const { session_id } = router.query;

  const { authenticated, logout, login, tokenInfo, urlAlias } = useAuth();

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
            Stripe is sending us your booking information....
          </Heading>
        </Flex>
      )}
      {verificationError && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            That is not a valid session
          </Heading>
        </Flex>
      )}
      {retryVerificationLink && (
        <Heading>
          Your booking is not complete ... you can finish it{" "}
          <Link href={retryVerificationLink}>here</Link>
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
