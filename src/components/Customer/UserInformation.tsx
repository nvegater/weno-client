import React, { FC } from "react";
import { Flex, Heading } from "@chakra-ui/react";
import {
  CardProperty,
  CardWithUserDetails,
} from "../Cards/CardWithUserDetails/CardWithUserDetails";
import { dateFormatter, timeFormatter } from "../utils/dateTime-utils";
import { CustomerFragment } from "../../graphql/generated/graphql";
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation("global");

  return (
    <section>
      <Flex justifyContent={[null, null, null, "center"]}>
        <Heading as="h1" size="xl">
          {t("customerInformation")}
        </Heading>
      </Flex>
      <CardWithUserDetails properties={accountProps} title="Weno Account" />
    </section>
  );
};
