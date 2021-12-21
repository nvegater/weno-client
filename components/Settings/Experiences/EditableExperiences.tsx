import React, { FC } from "react";
import { ExperiencesGridLayout } from "../../GeneralLayout/ExperiencesGridLayout";

interface EditableExperiencesProps {}

export const EditableExperiences: FC<EditableExperiencesProps> = ({}) => {
  // TODO select one of the experiences to Edit
  // TODO Add Experiences Grid with ---> Select and Edit

  // TODO retrieve experiences from winery and send them to the Grid Layout
  return <ExperiencesGridLayout experiences={[]} />;
};
