import React, { FC } from "react";
import {
  ExperienceSlot,
  PaginatedExperienceWithSlots,
} from "../../graphql/generated/graphql";

interface EditExperienceModalProps {
  experienceId: number;
  experiences: PaginatedExperienceWithSlots[];
}

export const EditExperienceModal: FC<EditExperienceModalProps> = ({
  experienceId,
  experiences,
}) => {
  // TODO retrieve slots and show Edit Screen --> Use the one from Chakra Edit Account Settings

  const selectedExperience: PaginatedExperienceWithSlots | undefined =
    experiences.find((exp) => exp.id === experienceId);

  const slotsFromSelectedExperience: Array<ExperienceSlot> = selectedExperience
    ? selectedExperience.slots
    : [];

  console.log(slotsFromSelectedExperience);

  return <div>Hola</div>;
};
