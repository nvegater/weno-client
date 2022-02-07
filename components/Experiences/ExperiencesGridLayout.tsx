import React, { FC } from "react";
import { ExperienceCardCover } from "../Cards/ExperienceCardCover";
import { Box, Flex, Grid } from "@chakra-ui/react";
import { PaginatedExperienceFragment } from "../../graphql/generated/graphql";

interface ExperiencesGridLayoutProps {
  experiences: PaginatedExperienceFragment[];
  openExperienceModal: (experience: PaginatedExperienceFragment) => void;
}

export const ExperiencesGridLayout: FC<ExperiencesGridLayoutProps> = ({
  experiences,
  openExperienceModal,
}) => {
  return (
    <Box mx={[null, null, 10, 20]}>
      <Box maxW="100rem" mt={8}>
        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(274px, 1fr))"
          gap={3}
        >
          {experiences.length > 0 &&
            experiences.map((exp) => (
              <Flex justifyContent="center" key={exp.title}>
                <ExperienceCardCover
                  experience={exp}
                  openExperienceModal={openExperienceModal}
                />
              </Flex>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};
