import { useEffect, useState } from "react";
import { useGetCheckoutSessionStatusQuery } from "../../graphql/generated/graphql";

interface UseVerifySessionHookProps {
  sessionId: string | null | string[];
}

interface UseVerifySessionHookResult {
  loadingVerification: boolean;
  verificationError: boolean;
  isVerified: boolean;
  retryVerificationLink: string | null;
}

type UseVerifySessionHook = (
  props: UseVerifySessionHookProps
) => UseVerifySessionHookResult;

const useVerifySession: UseVerifySessionHook = ({ sessionId }) => {
  // http://localhost:3000/winery/theAlias?session_id=cs_test_b1BRjVbQsImZAEqMJiQENGFPrEvkeOelYHoH2bfjMsIJCU0ivFtmxAknnR

  const [sessionVerification, setSessionVerification] =
    useState<boolean>(false);

  const [retryVerificationLink, setRetryVerificationLink] = useState(null);

  const [
    {
      data: checkoutSession,
      error: checkoutSessionError,
      fetching: loadingCheckoutSession,
    },
  ] = useGetCheckoutSessionStatusQuery({
    variables: {
      sessionId: sessionId ? (sessionId as string) : "",
    },
    pause: sessionId === null,
    requestPolicy: "network-only",
  });

  useEffect(() => {
    if (checkoutSession?.getCheckoutSessionStatus.sessionStatus === "open") {
      setRetryVerificationLink(
        checkoutSession?.getCheckoutSessionStatus.sessionUrl
      );
    } else if (
      checkoutSession?.getCheckoutSessionStatus.sessionStatus === "complete"
    ) {
      setSessionVerification(true);
    }
  }, [checkoutSession]);

  return {
    loadingVerification: loadingCheckoutSession,
    verificationError: Boolean(checkoutSessionError),
    isVerified: sessionVerification,
    retryVerificationLink,
  };
};

export default useVerifySession;
