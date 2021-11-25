import React, { FC } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import {
  CardProperty,
  CardWithUserDetails,
} from "../../Cards/CardWithUserDetails/CardWithUserDetails";
import {
  useGetSubscriptionStatusQuery,
  WineryFragmentFragment,
} from "../../../graphql/generated/graphql";
import { ContextHeader } from "../../Authentication/useAuth";

interface WineryOwnerInfoProps {
  winery: WineryFragmentFragment;
  contextHeader: ContextHeader;
}

// https://nodejs.org/docs/latest-v12.x/api/intl.html
const timeFormatter = Intl.DateTimeFormat("en", {
  minute: "2-digit",
  hour: "2-digit",
});
const dateFormatter = Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});
export const WineryOwnerInfo: FC<WineryOwnerInfoProps> = ({
  winery,
  contextHeader,
}) => {
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

      <CardWithUserDetails properties={accountProps} title="Account" />
      <CardWithUserDetails
        properties={subscriptionProps}
        title="Subscription"
      />
    </section>
  );
};
