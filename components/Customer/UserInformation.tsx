import React, { FC } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import {
  CardProperty,
  CardWithUserDetails,
} from "../Cards/CardWithUserDetails/CardWithUserDetails";
import { dateFormatter, timeFormatter } from "../utils/dateTime-utils";
import { CustomerFragment } from "../../graphql/generated/graphql";

interface UserInformationProps {
  customer: CustomerFragment;
}

export const UserInformation: FC<UserInformationProps> = ({ customer }) => {
  const newDate = new Date(customer.createdAt);
  const createdAt = `${timeFormatter.format(newDate)} - ${dateFormatter.format(
    newDate
  )}`;
  const accountProps: CardProperty[] = [
    { name: "Username", value: customer.username },
    { name: "Email", value: customer.email },
    { name: "Member since", value: createdAt },
  ];

  return (
    <section>
      <Flex justifyContent={[null, null, null, "center"]}>
        <Heading as="h1" size="xl">
          Customer Information
        </Heading>
      </Flex>
      <CardWithUserDetails properties={accountProps} title="Weno Account" />
    </section>
  );
};
