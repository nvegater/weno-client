import { HandlePaginationRequestFn } from "../utils/useFiltersPagination";
import { CursorPaginationInput } from "../../graphql/generated/graphql";
import React, { FC } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

interface LoadMoreButtonProps {
  disableButton: boolean;
  noOfExperiences: number;
  handlePaginationRequest: HandlePaginationRequestFn;
  paginationConfig: CursorPaginationInput;
  newPaginationConfig?: CursorPaginationInput;
}

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  disableButton,
  noOfExperiences,
  handlePaginationRequest,
  paginationConfig,
  newPaginationConfig,
}) => {
  const [t] = useTranslation("global");
  return (
    <Flex justifyContent="center" mt={5}>
      <Button
        size="navBarCTA"
        variant="cta"
        width="300px"
        isDisabled={disableButton}
        onClick={() => {
          if (noOfExperiences > 0) {
            handlePaginationRequest(paginationConfig, newPaginationConfig);
          }
        }}
      >
        {disableButton ? t("noMoreResults") : t("loadMore")}
      </Button>
    </Flex>
  );
};
