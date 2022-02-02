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
import { useTranslation } from "react-i18next";
import { LoadMoreButton } from "../../../Experiences/LoadMoreButton";

interface AllExperiencesProps {}

export const AllExperiences: FC<AllExperiencesProps> = ({}) => {
  const [paginationConfig, experiencesFilters, , handlePaginationRequest] =
    useFiltersPagination();
  const [t] = useTranslation("global");
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
    if (data && data.experiences.experiences) {
      const newExps = data?.experiences?.experiences;
      const newTitles = newExps.map((exp) => exp.title);
      const oldTitles = experiences.map((exp) => exp.title);
      if (!newTitles.some((newTitle) => oldTitles.includes(newTitle))) {
        // update experiences if new request contains new titles
        setExperiences((e) => [...e, ...newExps]);
      }
    }
    if (data?.experiences.errors) {
      setExperiences([]);
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
