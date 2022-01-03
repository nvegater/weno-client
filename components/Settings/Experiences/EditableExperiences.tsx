import React, { FC, useEffect, useState } from "react";
import {
  ExperiencesGridLayout,
  ExperiencesGridMode,
} from "../../Experiences/ExperiencesGridLayout";
import { ContextHeader } from "../../Authentication/useAuth";
import { useRecoilValue } from "recoil";
import { createdExperienceIdState } from "../../Experiences/CreateExperience";
import {
  PaginatedExperience,
  useEditableExperiencesQuery,
  WineryFragmentFragment,
} from "../../../graphql/generated/graphql";
import useFiltersPagination from "../../utils/useFiltersPagination";
import { Button, Flex } from "@chakra-ui/react";

interface EditableExperiencesProps {
  contextHeader: ContextHeader;
  winery: WineryFragmentFragment;
}

export const EditableExperiences: FC<EditableExperiencesProps> = ({
  contextHeader,
  winery,
}) => {
  const recentlyCreatedExperienceId = useRecoilValue(createdExperienceIdState);
  const autoSelectExperience = recentlyCreatedExperienceId !== null;

  const [paginationConfig, experiencesFilters, handlePaginationRequest] =
    useFiltersPagination();

  const [experiences, setExperiences] = useState<PaginatedExperience[]>([]);

  const [{ data, fetching, error: networkError }] = useEditableExperiencesQuery(
    {
      variables: {
        paginatedExperiencesInputs: {
          paginationConfig: { ...paginationConfig },
          experiencesFilters: { ...experiencesFilters },
        },
        wineryId: winery.id,
      },
      requestPolicy: "network-only",
      context: contextHeader,
    }
  );

  useEffect(() => {
    if (data && data.editableExperiences.experiences) {
      const newExps = data?.editableExperiences?.experiences;
      const newTitles = newExps.map((exp) => exp.title);
      const oldTitles = experiences.map((exp) => exp.title);
      if (!newTitles.some((newTitle) => oldTitles.includes(newTitle))) {
        // update experiences if new request contains new titles
        setExperiences((e) => [...e, ...newExps]);
      }
    }
  }, [data, experiences]);

  const noMoreResults =
    data?.editableExperiences?.paginationConfig?.beforeCursor === null &&
    data?.editableExperiences?.paginationConfig?.afterCursor === null;

  return (
    <>
      {fetching && <div>Generator Loading screen</div>}
      {networkError && <div>Network Error screen</div>}
      {data?.editableExperiences.errors && <div>Server Error screen</div>}
      <ExperiencesGridLayout
        experiences={experiences}
        mode={ExperiencesGridMode.EDIT}
        winery={winery}
        preSelectedExperienceId={
          autoSelectExperience
            ? recentlyCreatedExperienceId
            : experiences.length > 0
            ? experiences[0].id
            : undefined
        }
      />
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
                data.editableExperiences.paginationConfig
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
