import React, { FC } from "react";
import { Heading, Flex, Button, Text, Link } from "@chakra-ui/react";
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
        We want to help you earn money in the most secure way while always being
        up to date with new regulations. <br /> Thats why we partnered with{" "}
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
        <Button variant="secondaryWeno" size="heroWeno">
          Enable Stripe connected account
        </Button>
      </Flex>
    </section>
  );
};
