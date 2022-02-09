import React, { FC } from "react";
import { useWineryQuery } from "../../graphql/generated/graphql";
import { Flex, Heading } from "@chakra-ui/react";
import { ContextHeader } from "../Authentication/useAuth";
import { WineryProfileLayout } from "./WineryProfileLayout";
import { WineryCard } from "./WineryCard";

interface WineryProfileProps {
  isOwner: boolean;
  wineryAlias: string;
  contextHeader: ContextHeader;
  logout: () => void;
}
export const WineryProfile: FC<WineryProfileProps> = ({
  isOwner,
  wineryAlias,
  contextHeader,
  logout,
}) => {
  const [
    { data: wineryQuery, error: errorFetchingWinery, fetching: fetchingWinery },
  ] = useWineryQuery({
    variables: {
      getWineryInputs: { urlAlias: wineryAlias },
    },
    context: contextHeader,
    requestPolicy: "network-only",
  });

  const displayError =
    (wineryQuery && wineryQuery.winery.errors) || errorFetchingWinery;
  const errorMessageAvailable = wineryQuery && wineryQuery.winery.errors;
  return (
    <div>
      {fetchingWinery && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            We are fetching the winery information....
          </Heading>
        </Flex>
      )}
      {displayError && !fetchingWinery && (
        <Flex justifyContent="center" m={5}>
          <Heading as="h2" size="xl">
            {errorMessageAvailable
              ? wineryQuery.winery.errors[0].field +
                ": " +
                wineryQuery.winery.errors[0].message
              : "Error"}
          </Heading>
        </Flex>
      )}
      {wineryQuery && wineryQuery.winery.winery && isOwner && (
        <WineryProfileLayout
          winery={wineryQuery.winery.winery}
          logoutFn={logout}
          contextHeader={contextHeader}
        />
      )}
      {wineryQuery && wineryQuery.winery.winery && !isOwner && <WineryCard />}
    </div>
  );
};
