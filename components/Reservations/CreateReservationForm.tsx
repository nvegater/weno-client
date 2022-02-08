import React, { FC, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import useAuth from "../Authentication/useAuth";
import {
  GetCheckoutLinkMutation,
  GetCheckoutLinkMutationVariables,
  SlotFragmentFragment,
  useGetCheckoutLinkMutation,
} from "../../graphql/generated/graphql";
import { OperationContext, OperationResult } from "urql";
import { getToastMessage } from "../utils/chakra-utils";
import { useTranslation } from "react-i18next";

async function handleBookingLinkRequest(
  totalPrice: number,
  pricePerPersonInDollars: number,
  selectedSlot: SlotFragmentFragment,
  getCheckoutLink: (
    variables?: GetCheckoutLinkMutationVariables,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<GetCheckoutLinkMutation, GetCheckoutLinkMutationVariables>
  >,
  toast,
  email: string,
  username?: string
) {
  const noOfVisitors = totalPrice / pricePerPersonInDollars;
  const webpageBase = window.location.origin;
  const redirectUri = webpageBase + "/order";
  const { data, error } = await getCheckoutLink({
    createCustomerInputs: {
      email: email,
      paymentMetadata: username ? { username } : null,
    },
    slotIds: [selectedSlot.id],
    cancelUrl: webpageBase + "/",
    successUrl: redirectUri + "/success",
    noOfVisitors: noOfVisitors,
  });

  if (error) {
    toast(getToastMessage("bookingFailed"));
    console.log(error);
  }

  if (data?.getCheckoutLink.errors != null) {
    toast(getToastMessage("bookingNotPossibleServerError"));
    console.log(data.getCheckoutLink.errors);
  }

  if (data?.getCheckoutLink.errors == null) {
    window.location.href = data.getCheckoutLink.link;
  }
}

interface CreateReservationProps {
  pricePerPerson: number;
  slot: SlotFragmentFragment;
  totalPrice: number;
}

export const CreateReservationForm: FC<CreateReservationProps> = ({
  pricePerPerson,
  slot,
  totalPrice,
}) => {
  const { authenticated, register, tokenInfo } = useAuth();

  const [submittingBooking, setSubmittingBooking] = useState(false);
  const [requestGuestEmail, setRequestGuestEmail] = useState(false);
  const [guestEmail, setGuestEmail] = useState("");

  const [, getCheckoutLink] = useGetCheckoutLinkMutation();
  const [t] = useTranslation("global");

  const toast = useToast();
  return (
    <Flex justifyContent={authenticated ? "center" : "space-between"} my={10}>
      {authenticated && (
        <Button
          variant="primaryWeno"
          size="heroWeno"
          onClick={async () => {
            await handleBookingLinkRequest(
              totalPrice,
              pricePerPerson,
              slot,
              getCheckoutLink,
              toast,
              tokenInfo.email,
              tokenInfo.preferred_username
            );
          }}
        >
          {t("book")}
        </Button>
      )}
      {!authenticated && (
        <>
          {!requestGuestEmail && (
            <>
              <Button
                variant="primaryWeno"
                size="heroWeno"
                onClick={() => {
                  setRequestGuestEmail(true);
                }}
              >
                {t("bookAsGuest")}
              </Button>

              <Button
                size="heroWeno"
                variant="cta"
                onClick={() => {
                  if (!authenticated) {
                    const webpageBase = window.location.origin;
                    register({ redirectUri: webpageBase + "/register" });
                  }
                }}
              >
                {t("registerAndBook")}
              </Button>
            </>
          )}

          {requestGuestEmail && (
            <FormControl
              display="flex"
              flexDirection="column"
              isInvalid={guestEmail === ""}
              isRequired
            >
              <FormLabel htmlFor="guestEmail">{t("requireEmail")}</FormLabel>
              <Input
                type="email"
                name="guestEmail"
                onChange={(e) => {
                  setGuestEmail(e.target.value);
                }}
              />
              <Button
                size="heroWeno"
                isLoading={submittingBooking}
                variant="cta"
                my={2}
                onClick={async () => {
                  const isValidEmail = guestEmail !== "";
                  if (isValidEmail) {
                    setSubmittingBooking(true);
                    await handleBookingLinkRequest(
                      totalPrice,
                      pricePerPerson,
                      slot,
                      getCheckoutLink,
                      toast,
                      guestEmail
                    );
                    setSubmittingBooking(false);
                  }
                }}
              >
                {t("book")}
              </Button>
              {guestEmail !== "" ? (
                <FormHelperText>{t("whereReceiveInformation")}</FormHelperText>
              ) : (
                <FormErrorMessage>{t("emailRequired")}</FormErrorMessage>
              )}
            </FormControl>
          )}
        </>
      )}
    </Flex>
  );
};
