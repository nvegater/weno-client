import React, { FC } from "react";
import { ContextHeader } from "../Authentication/useAuth";
import { useCustomerQuery } from "../../graphql/generated/graphql";
import { Flex, Heading } from "@chakra-ui/react";
import { CustomerCard } from "./CustomerCard";
import { UserProfileLayout } from "./UserProfileLayout";

interface UserProfileProps {
  isVisitor: boolean;
  username: string;
  email: string;
  contextHeader: ContextHeader;
  logoutFn: () => void;
}

export const UserProfile: FC<UserProfileProps> = ({
  isVisitor,
  email,
  username,
  contextHeader,
  logoutFn,
}) => {
  const [{ data: customerResponse, fetching, error }] = useCustomerQuery({
    variables: {
      createCustomerInputs: {
        email: email,
        paymentMetadata: {
          username: username,
        },
      },
    },
    context: contextHeader,
    requestPolicy: "network-only",
  });

  const displayError =
    (customerResponse && customerResponse.customer.errors) || error;

  const errorMessageAvailable =
    customerResponse && customerResponse.customer.errors;

  return (
    <>
      {fetching && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            We are fetching your profile information....
          </Heading>
        </Flex>
      )}

      {displayError && !fetching && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            {errorMessageAvailable
              ? customerResponse.customer.errors[0].field +
                ": " +
                customerResponse.customer.errors[0].message
              : "Error"}
          </Heading>
        </Flex>
      )}
      {customerResponse && customerResponse.customer && !isVisitor && (
        <CustomerCard />
      )}
      {customerResponse && customerResponse.customer && isVisitor && (
        <UserProfileLayout
          logoutFn={logoutFn}
          contextHeader={contextHeader}
          customer={customerResponse.customer.customer}
        />
      )}
    </>
  );
};
