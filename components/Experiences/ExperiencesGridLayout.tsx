import React, { FC } from "react";
import { ReservationModal } from "../Modals/ReservationModal";
import { EditExperienceModal } from "../Modals/EditExperienceModal";
import { ExperienceModal } from "../Modals/ExperienceModal";
import { ExperienceCardCover } from "../Cards/ExperienceCardCover";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { PaginatedExperience } from "../../graphql/generated/graphql";

export enum ExperiencesGridMode {
  EDIT,
  RESERVE,
  VIEW,
}

// TODO add props: Experiences
interface ExperiencesGridLayoutProps {
  experiences: PaginatedExperience[];
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
      <Box maxW="100rem">
        {experiences.length === 0 && <div>No results found</div>}
        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(274px, 1fr))"
          gap={3}
        >
          {experiences.length > 0 &&
            experiences.map((exp) => (
              <Flex justifyContent="center" key={exp.title}>
                <ExperienceCardCover {...exp} />
              </Flex>
            ))}
        </Grid>
      </Box>
    </div>
  );
};
