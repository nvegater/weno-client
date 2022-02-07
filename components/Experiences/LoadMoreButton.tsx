import React, { FC } from "react";
import { Button, Flex } from "@chakra-ui/react";

interface LoadMoreButtonProps {
  disableButton: boolean;
  loadMore: () => void;
}

export const LoadMoreButton: FC<LoadMoreButtonProps> = ({
  disableButton,
  loadMore,
}) => {
  return (
    <Flex justifyContent="center" mt={5}>
      <Button
        size="navBarCTA"
        variant="cta"
        width="300px"
        isDisabled={disableButton}
        onClick={() => {
          loadMore();
        }}
      >
        {disableButton ? "No more results" : "Load more"}
      </Button>
    </Flex>
  );
};
