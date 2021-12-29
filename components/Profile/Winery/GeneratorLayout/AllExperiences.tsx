import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import {
  ExperiencesGridLayout,
  ExperiencesGridMode,
} from "../../../Experiences/ExperiencesGridLayout";
import {
  CursorPaginationInput,
  ExperiencesFilters,
  PaginatedExperience,
  useExperiencesQuery,
} from "../../../../graphql/generated/graphql";
import { Button, Flex } from "@chakra-ui/react";

const DEFAULT_PAGINATION_CONFIG = {
  beforeCursor: null,
  afterCursor: null,
  limit: 4,
};

const DEFAULT_FILTERS_CONFIG = {
  valley: null,
  experienceType: null,
  experienceName: null,
};

const handlePaginationRequest = (
  oldPaginationConfig: CursorPaginationInput,
  newPaginationConfig: CursorPaginationInput,
  updatePaginationConfig: Dispatch<SetStateAction<CursorPaginationInput>>
) => {
  let updateScheduled: boolean = false;
  if (
    isNewCursorConfig(
      newPaginationConfig.beforeCursor,
      newPaginationConfig.afterCursor,
      oldPaginationConfig.beforeCursor,
      oldPaginationConfig.afterCursor
    )
  ) {
    updatePaginationConfig((oldConfig) => ({
      limit: oldConfig.limit,
      beforeCursor: newPaginationConfig.beforeCursor,
      afterCursor: newPaginationConfig.afterCursor,
    }));
    updateScheduled = true;
  }
  return updateScheduled;
};

interface AllExperiencesProps {}

function isNewCursorConfig(
  newBeforeCursor: string | null,
  newAfterCursor: string | null,
  oldBeforeCursor: string | null,
  oldAfterCursor: string | null
) {
  const isNewBeforeCursor = oldBeforeCursor !== newBeforeCursor;
  const isNewAfterCursor = oldAfterCursor !== newAfterCursor;
  return isNewAfterCursor || isNewBeforeCursor;
}

export const AllExperiences: FC<AllExperiencesProps> = ({}) => {
  const [experiencesFilters] = useState<ExperiencesFilters>(
    DEFAULT_FILTERS_CONFIG
  );
  const [paginationConfig, setPaginationConfig] =
    useState<CursorPaginationInput>(DEFAULT_PAGINATION_CONFIG);

  const [experiences, setExperiences] = useState<PaginatedExperience[]>([]);

  const [{ data, fetching, error: networkError }] = useExperiencesQuery({
    variables: {
      paginatedExperiencesInputs: {
        paginationConfig: { ...paginationConfig },
        experiencesFilters: { ...experiencesFilters },
      },
    },
    requestPolicy: "network-only",
  });

  useEffect(() => {
    if (data && data.experiences.experiences) {
      const newExps = data?.experiences?.experiences;
      const newTitles = newExps.map((exp) => exp.title);
      const oldTitles = experiences.map((exp) => exp.title);
      if (!newTitles.some((newTitle) => oldTitles.includes(newTitle))) {
        // update experiences if new request contains new titles
        setExperiences((e) => [...e, ...newExps]);
      }
    }
  }, [data, experiences]);

  const noMoreResults =
    data?.experiences?.paginationConfig?.beforeCursor === null &&
    data?.experiences?.paginationConfig?.afterCursor === null;
  return (
    <>
      {fetching && <div>Generator Loading screen</div>}
      {networkError && <div>Network Error screen</div>}
      {data?.experiences.errors && <div>Server Error screen</div>}
      {data?.experiences && data.experiences.errors === null && (
        <ExperiencesGridLayout
          experiences={experiences}
          mode={ExperiencesGridMode.VIEW}
        />
      )}

      <Flex justifyContent="center" mt={5}>
        <Button
          size="navBarCTA"
          variant="cta"
          width="300px"
          isDisabled={noMoreResults}
          onClick={() => {
            if (experiences.length > 0) {
              handlePaginationRequest(
                paginationConfig,
                data.experiences.paginationConfig,
                setPaginationConfig
              );
            }
          }}
        >
          {noMoreResults ? "No more results" : "Load more"}
        </Button>
      </Flex>
    </>
  );
};
