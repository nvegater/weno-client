import React, { FC, useEffect, useState } from "react";
import { Heading, Flex, Button, Text, Link } from "@chakra-ui/react";
import {
  CardProperty,
  CardWithUserDetails,
} from "../../Cards/CardWithUserDetails/CardWithUserDetails";
import {
  useConfirmConnectedAccountMutation,
  useGetSubscriptionStatusQuery,
  useWineryOnboardingMutation,
  WineryConfirmationFragmentFragment,
  WineryFragmentFragment,
} from "../../../graphql/generated/graphql";
import { ContextHeader } from "../../Authentication/useAuth";
import { dateFormatter, timeFormatter } from "../../utils/dateTime-utils";

interface WineryOwnerInfoProps {
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

export const WineryOwnerInfo: FC<WineryOwnerInfoProps> = ({
  winery,
  contextHeader,
}) => {
  // TODO modify this query to get an object with all the subscription related information: Subscription, connected account, payment status, count of reservations etc..
  const [
    {
      data: subscriptionStatus,
      error: errorSubscriptionStatus,
      fetching: fetchingSubsStatus,
    },
  ] = useGetSubscriptionStatusQuery({
    variables: { customerId: winery.stripe_customerId },
    context: contextHeader,
  });

  const [connectedAccountInfo, setConnectedAccountInfo] = useState<
    CardProperty[]
  >([]);

  const [, onboardWinery] = useWineryOnboardingMutation();
  const [, confirmConnectedAccount] = useConfirmConnectedAccountMutation();

  useEffect(() => {
    const confirmAccount = async () => {
      const { error, data } = await confirmConnectedAccount(
        {
          wineryAlias: winery.urlAlias,
        },
        { ...contextHeader, requestPolicy: "network-only" }
      );
      if (data?.confirmConnectedAccount.winery) {
        const accountInfo: WineryConfirmationFragmentFragment =
          data.confirmConnectedAccount.winery;
        const date = new Date(0);
        date.setUTCSeconds(accountInfo.accountCreatedTime);
        const createdAt = `${timeFormatter.format(
          date
        )} - ${dateFormatter.format(date)}`;
        setConnectedAccountInfo([
          { name: "Account ID", value: accountInfo.accountId },
          { name: "Created", value: createdAt },
        ]);
      } else {
        console.error(error);
      }
    };

    confirmAccount();
  }, [confirmConnectedAccount, contextHeader, winery.urlAlias]);

  // TODO implement case when connected account is set up
  const handleOnboarding = async () => {
    const { error, data } = await onboardWinery(
      {
        wineryAlias: winery.urlAlias,
      },
      { ...contextHeader, requestPolicy: "network-only" }
    );
    if (error) {
      console.log(error);
    } else {
      window.location.href = data.wineryOnboarding?.accountLinkUrl;
    }
  };

  const newDate = new Date(winery.createdAt);
  const createdAt = `${timeFormatter.format(newDate)} - ${dateFormatter.format(
    newDate
  )}`;
  const accountProps: CardProperty[] = [
    { name: "Username", value: winery.creatorUsername },
    { name: "Email", value: winery.creatorEmail },
    { name: "Member since", value: createdAt },
  ];
  const subscriptionProps: CardProperty[] = [
    { name: "Tier", value: winery.subscription },
    { name: "Cutomer ID", value: winery.stripe_customerId },
    {
      name: "Status",
      value: subscriptionStatus
        ? subscriptionStatus.getSubscriptionStatus
        : errorSubscriptionStatus
        ? "Error"
        : fetchingSubsStatus
        ? "Loading"
        : "",
    },
  ];
  return (
    <section>
      <Flex justifyContent={[null, null, null, "center"]}>
        <Heading as="h1" size="xl">
          Winery Information
        </Heading>
      </Flex>

      <CardWithUserDetails properties={accountProps} title="Weno Account" />
      <CardWithUserDetails
        properties={subscriptionProps}
        title="Subscription"
      />

      {connectedAccountInfo.length > 0 && (
        <CardWithUserDetails
          properties={connectedAccountInfo}
          title="Stripe Connected Account"
        />
      )}

      {connectedAccountInfo.length === 0 && (
        <>
          <Flex justifyContent={[null, null, null, "center"]}>
            <Heading as="h4" size="md">
              One more step to start selling your experiences
            </Heading>
          </Flex>

          <Text
            my={4}
            mx={[0, 0, 0, "5em"]}
            textAlign={[null, null, null, "center"]}
          >
            We want to help you earn money in the most secure way while always
            being up to date with new regulations. <br /> Thats why we partnered
            with{" "}
            <Link
              fontWeight="bold"
              href="https://stripe.com/blog/stripe-launches-in-mexico"
            >
              Stripe
            </Link>
            . Read more about their{" "}
            <Link href="https://stripe.com/en-mx/privacy">Privacy Policy</Link>.
          </Text>

          <Flex justifyContent={[null, null, null, "center"]}>
            <Button
              variant="secondaryWeno"
              size="heroWeno"
              onClick={handleOnboarding}
            >
              Enable Stripe connected account
            </Button>
          </Flex>
        </>
      )}
    </section>
  );
};
