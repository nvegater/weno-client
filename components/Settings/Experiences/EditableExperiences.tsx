import React, { FC, useEffect, useState } from "react";
import {
  ExperiencesGridLayout,
  ExperiencesGridMode,
} from "../../Experiences/ExperiencesGridLayout";
import { ContextHeader } from "../../Authentication/useAuth";
import { useRecoilValue } from "recoil";
import { createdExperienceIdState } from "../../Experiences/CreateExperience";
import {
  PaginatedExperienceFragment,
  useEditableExperiencesQuery,
  WineryFragmentFragment,
} from "../../../graphql/generated/graphql";
import useFiltersPagination from "../../utils/useFiltersPagination";
import { LoadMoreButton } from "../../Experiences/LoadMoreButton";
import { getUniqueListTyped } from "../../utils/react-utils";

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

  const [paginationConfig, experiencesFilters, , handlePaginationRequest] =
    useFiltersPagination();

  const [experiences, setExperiences] = useState<PaginatedExperienceFragment[]>(
    []
  );

  const [{ data, fetching, error: networkError }] = useEditableExperiencesQuery(
    {
      variables: {
        paginatedExperiencesInputs: {
          paginationConfig: { ...paginationConfig },
          experiencesFilters: { ...experiencesFilters, wineryIds: [winery.id] },
        },
      },
      requestPolicy: "network-only",
      context: contextHeader,
    }
  );

  useEffect(() => {
    if (data) {
      if (data.editableExperiences.errors) {
        setExperiences([]);
      } else {
        const newExps = data?.editableExperiences?.experiences;
        setExperiences((e) => {
          const accumulated = [...e, ...newExps];
          const unique = getUniqueListTyped(accumulated, "id");
          return [...unique];
        });
      }
    }
  }, [data, experiences]);

  return (
    <>
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
        fetching={fetching}
        networkError={networkError}
      />
      <LoadMoreButton
        disableButton={
          !Boolean(data?.editableExperiences?.paginationConfig?.moreResults)
        }
        noOfExperiences={experiences.length}
        handlePaginationRequest={handlePaginationRequest}
        paginationConfig={paginationConfig}
        newPaginationConfig={data?.editableExperiences?.paginationConfig}
      />
    </>
  );
};
