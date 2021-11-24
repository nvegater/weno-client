import { useEffect, useState } from "react";
import { useGetCheckoutSessionStatusQuery } from "../../graphql/generated/graphql";
import { ContextHeader } from "./useAuth";

interface UseVerifySessionHookProps {
  sessionId: string | null;
  contextHeader: ContextHeader;
}

interface UseVerifySessionHookResult {
  loadingVerification: boolean;
  verificationError: boolean;
  isVerified: boolean;
}

type UseVerifySessionHook = (
  props: UseVerifySessionHookProps
) => UseVerifySessionHookResult;

const useVerifySession: UseVerifySessionHook = ({
  sessionId,
  contextHeader,
}) => {
  // http://localhost:3000/winery/wineryAlias?session_id=cs_test_b1BRjVbQsImZAEqMJiQENGFPrEvkeOelYHoH2bfjMsIJCU0ivFtmxAknnR
  const sessionID = sessionId ? sessionId : null;

  const [verifiedSubscription, setVerifiedSubscription] =
    useState<boolean>(false);

  const [
    {
      data: checkoutSession,
      error: checkoutSessionError,
      fetching: loadingCheckoutSession,
    },
  ] = useGetCheckoutSessionStatusQuery({
    variables: {
      sessionId: sessionID as string,
    },
    pause: !sessionID,
    context: contextHeader,
    requestPolicy: "network-only",
  });

  useEffect(() => {
    if (
      sessionID &&
      !(checkoutSession?.getCheckoutSessionStatus.sessionStatus === "open")
    ) {
      window.location.href =
        checkoutSession?.getCheckoutSessionStatus.sessionUrl;
    } else if (
      checkoutSession?.getCheckoutSessionStatus.sessionStatus === "complete"
    ) {
      setVerifiedSubscription(true);
    }
  }, [checkoutSession, sessionID]);

  return {
    loadingVerification: loadingCheckoutSession,
    verificationError: Boolean(checkoutSessionError),
    isVerified: verifiedSubscription,
  };
};

export default useVerifySession;
