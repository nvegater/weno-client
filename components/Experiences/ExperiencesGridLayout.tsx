import React, { FC } from "react";
import { ReservationModal } from "../Modals/ReservationModal";
import { EditExperienceModal } from "../Modals/EditExperienceModal";

export enum ExperiencesGridMode {
  EDIT,
  RESERVE,
}

// TODO add props: Experiences
interface ExperiencesGridLayoutProps {
  experiences: any[];
  mode: ExperiencesGridMode;
  preSelectedExperienceId?: number;
}

export const ExperiencesGridLayout: FC<ExperiencesGridLayoutProps> = ({
  mode,
}) => {
  // TODO show experiences from Props
  //  Allow two options after selection (both options slots are retrievable): Reserve or Edit

  return (
    <div>
      {mode === ExperiencesGridMode.RESERVE && (
        <ReservationModal experienceId={1} />
      )}
      {mode === ExperiencesGridMode.EDIT && (
        <EditExperienceModal experienceId={1} />
      )}
    </div>
  );
};
