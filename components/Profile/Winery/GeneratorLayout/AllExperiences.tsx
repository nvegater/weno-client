import React, { FC, useState } from "react";
import {
  ExperiencesGridLayout,
  ExperiencesGridMode,
} from "../../../Experiences/ExperiencesGridLayout";
import {
  CursorPaginationInput,
  ExperiencesFilters,
  useExperiencesQuery,
} from "../../../../graphql/generated/graphql";

interface AllExperiencesProps {}

export const AllExperiences: FC<AllExperiencesProps> = ({}) => {
  const [experiencesFilters] = useState<ExperiencesFilters>({
    valley: null,
    experienceType: null,
    experienceName: null,
  });

  const [paginationConfig] = useState<CursorPaginationInput>({
    beforeCursor: null,
    afterCursor: null,
    limit: 20,
  });
  const [{ data, fetching, error }] = useExperiencesQuery({
    variables: {
      paginatedExperiencesInputs: {
        paginationConfig: { ...paginationConfig },
        experiencesFilters: { ...experiencesFilters },
      },
    },
  });

  return (
    <>
      {fetching && <div>Generator Loading screen</div>}
      {error && <div>Network Error screen</div>}
      {data && data.experiences.errors && <div>Server Error screen</div>}
      {data && data.experiences && data.experiences.errors === null && (
        <ExperiencesGridLayout
          experiences={data.experiences.experiences}
          mode={ExperiencesGridMode.VIEW}
        />
      )}
    </>
  );
};
