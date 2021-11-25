import React, { FC } from "react";
import { Heading, Flex } from "@chakra-ui/react";
import {
  CardProperty,
  CardWithUserDetails,
} from "../../Cards/CardWithUserDetails/CardWithUserDetails";

interface WineryOwnerInfoProps {}

export const WineryOwnerInfo: FC<WineryOwnerInfoProps> = ({}) => {
  const accountProps: CardProperty[] = [
    { name: "Username", value: "insert" },
    { name: "Email", value: "insert" },
  ];
  const subscriptionProps: CardProperty[] = [
    { name: "Status", value: "insert" },
    { name: "Cutomer ID", value: "insert" },
  ];
  return (
    <section>
      <Flex as="section" justifyContent={[null, null, null, "center"]}>
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
