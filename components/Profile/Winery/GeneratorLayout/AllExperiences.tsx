import React, { FC, useEffect, useState } from "react";
import {
  ExperiencesGridLayout,
  ExperiencesGridMode,
} from "../../../Experiences/ExperiencesGridLayout";
import {
  PaginatedExperienceLightFragment,
  useExperiencesQuery,
} from "../../../../graphql/generated/graphql";
import useFiltersPagination from "../../../utils/useFiltersPagination";
import { LoadMoreButton } from "../../../Experiences/LoadMoreButton";
import { getUniqueListTyped } from "../../../utils/react-utils";

interface AllExperiencesProps {}

export const AllExperiences: FC<AllExperiencesProps> = ({}) => {
  const [paginationConfig, experiencesFilters, , handlePaginationRequest] =
    useFiltersPagination();

  const [experiences, setExperiences] = useState<
    PaginatedExperienceLightFragment[]
  >([]);

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
    if (data) {
      if (data.experiences.errors) {
        setExperiences([]);
      } else {
        const newExps = data?.experiences?.experiences;
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
      {fetching && <div>Generator Loading screen</div>}
      {networkError && <div>Network Error screen</div>}
      {data?.experiences.errors && <div>Server Error screen</div>}
      {data?.experiences && data.experiences.errors === null && (
        <ExperiencesGridLayout
          experiences={experiences}
          mode={ExperiencesGridMode.VIEW}
        />
      )}
      <LoadMoreButton
        disableButton={
          !Boolean(data?.experiences?.paginationConfig?.moreResults)
        }
        noOfExperiences={experiences.length}
        handlePaginationRequest={handlePaginationRequest}
        paginationConfig={paginationConfig}
        newPaginationConfig={data?.experiences?.paginationConfig}
      />
    </>
  );
};
