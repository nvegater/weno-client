import React, { FC } from "react";
import { ReservationModal } from "../Modals/ReservationModal";
import { EditExperienceModal } from "../Modals/EditExperienceModal";
import { ExperienceModal } from "../Modals/ExperienceModal";
import { ExperienceWithoutSlotsFragment } from "../../graphql/generated/graphql";
import { ExperienceCardCover } from "../Cards/ExperienceCardCover";
import { Box, Grid } from "@chakra-ui/react";

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
      <Box maxW="100rem" marginInline="auto" paddingInline="2rem">
        {experiences.length === 0 && <div>No results found</div>}
        <Grid gridTemplateColumns="1fr 1fr 1fr">
          {experiences.length > 0 &&
            experiences.map((exp) => <ExperienceCardCover key={exp.title} />)}
        </Grid>
      </Box>
    </div>
  );
};
