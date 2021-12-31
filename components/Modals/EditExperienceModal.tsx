import React, { FC } from "react";
import { ExperienceSlot } from "../../graphql/generated/graphql";

interface EditExperienceModalProps {
  experienceId: number;
  slots: ExperienceSlot[];
}

export const EditExperienceModal: FC<EditExperienceModalProps> = ({}) => {
  // TODO retrieve slots and show Edit Screen --> Use the one from Chakra Edit Account Settings

  return <div>Hola</div>;
};
