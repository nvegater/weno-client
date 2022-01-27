import React, { FC, useEffect, useState } from "react";
import {
  ExperiencesGridLayout,
  ExperiencesGridMode,
} from "../../../Experiences/ExperiencesGridLayout";
import {
  PaginatedExperience,
  useExperiencesQuery,
} from "../../../../graphql/generated/graphql";
import { Button, Flex } from "@chakra-ui/react";
import useFiltersPagination from "../../../utils/useFiltersPagination";
import { useTranslation } from "react-i18next";

interface AllExperiencesProps {}

export const AllExperiences: FC<AllExperiencesProps> = ({}) => {
  const [paginationConfig, experiencesFilters, handlePaginationRequest] =
    useFiltersPagination();

  const [experiences, setExperiences] = useState<PaginatedExperience[]>([]);
  const [t] = useTranslation("global");

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
                data.experiences.paginationConfig
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
