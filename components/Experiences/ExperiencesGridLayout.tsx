import React, { FC } from "react";
import { ReservationModal } from "../Modals/ReservationModal";
import { EditExperienceModal } from "../Modals/EditExperienceModal";
import { ExperienceModal } from "../Modals/ExperienceModal";
import { ExperienceWithoutSlotsFragment } from "../../graphql/generated/graphql";

export enum ExperiencesGridMode {
  EDIT,
  RESERVE,
  VIEW,
}

// TODO add props: Experiences
interface ExperiencesGridLayoutProps {
  experiences: ExperienceWithoutSlotsFragment[];
  mode: ExperiencesGridMode;
  preSelectedExperienceId?: number;
}

export const ExperiencesGridLayout: FC<ExperiencesGridLayoutProps> = ({
  mode,
  experiences,
}) => {
  //  TODO Allow two options after selection (both options slots are retrievable): Reserve or Edit

  return (
    <div>
      {mode === ExperiencesGridMode.RESERVE && (
        <ReservationModal experienceId={1} />
      )}
      {mode === ExperiencesGridMode.EDIT && (
        <EditExperienceModal experienceId={1} />
      )}
      {mode === ExperiencesGridMode.VIEW && (
        <ExperienceModal experienceId={1} />
      )}
      {experiences.length === 0 && <div>No results found</div>}
      {experiences.length > 0 &&
        experiences.map((exp) => <div key={exp.title}>{exp.title}</div>)}
    </div>
  );
};
