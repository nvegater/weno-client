import React, { FC } from "react";
import {
  ExperiencesGridLayout,
  ExperiencesGridMode,
} from "../../Experiences/ExperiencesGridLayout";
import { ContextHeader } from "../../Authentication/useAuth";
import { useRecoilValue } from "recoil";
import { createdExperienceIdState } from "../../Experiences/CreateExperience";

interface EditableExperiencesProps {
  contextHeader: ContextHeader;
}

export const EditableExperiences: FC<EditableExperiencesProps> = ({
  contextHeader,
}) => {
  console.log(contextHeader);
  const recentlyCreatedExperienceId = useRecoilValue(createdExperienceIdState);
  const autoSelectExperience = recentlyCreatedExperienceId !== null;
  // TODO select one of the experiences to Edit
  // TODO Add Experiences Grid with ---> Select and Edit

  // TODO retrieve experiences from winery and send them to the Grid Layout
  return (
    <ExperiencesGridLayout
      experiences={[]}
      mode={ExperiencesGridMode.EDIT}
      preSelectedExperienceId={
        autoSelectExperience ? recentlyCreatedExperienceId : undefined
      }
    />
  );
};
