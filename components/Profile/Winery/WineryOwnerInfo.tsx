import React, { FC } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import {
  CardProperty,
  CardWithUserDetails,
} from "../../Cards/CardWithUserDetails/CardWithUserDetails";
import { WineryFragmentFragment } from "../../../graphql/generated/graphql";

interface WineryOwnerInfoProps {
  winery: WineryFragmentFragment;
}

const timeFormatter = Intl.DateTimeFormat("en", {
  minute: "2-digit",
  hour: "2-digit",
});
const dateFormatter = Intl.DateTimeFormat("en", {
  dateStyle: "medium",
});
export const WineryOwnerInfo: FC<WineryOwnerInfoProps> = ({ winery }) => {
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
    // TODO retrieve subscription status
    { name: "Status", value: "Active ?" },
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
