import React, { FC } from "react";
import { ReservationModal } from "../Modals/ReservationModal";
import { EditExperienceModal } from "../Modals/EditExperienceModal";

// TODO add props: Experiences
interface ExperiencesGridLayoutProps {
  experiences: any[];
}

export const ExperiencesGridLayout: FC<ExperiencesGridLayoutProps> = ({}) => {
  // TODO show experiences from Props
  //  Allow two options after selection (both options slots are retrievable): Reserve or Edit
  const reserve = "reserve";
  const edit = "edit";
  return (
    <div>
      {reserve === "reserve" && <ReservationModal experienceId={1} />}
      {edit === "edit" && <EditExperienceModal experienceId={1} />}
    </div>
  );
};
