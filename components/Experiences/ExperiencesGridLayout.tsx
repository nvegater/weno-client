import React, { FC, useState } from "react";
import { ReservationModal } from "../Modals/ReservationModal";
import { EditExperienceModal } from "../Modals/EditExperienceModal";
import { ExperienceModal } from "../Modals/ExperienceModal";
import { ExperienceCardCover } from "../Cards/ExperienceCardCover";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Grid,
  Heading,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  PaginatedExperienceFragment,
  PaginatedExperienceLightFragment,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";

export enum ExperiencesGridMode {
  EDIT,
  RESERVE,
  VIEW,
}

interface ExperiencesGridLayoutProps {
  experiences: (
    | PaginatedExperienceFragment
    | PaginatedExperienceLightFragment
  )[];
  mode: ExperiencesGridMode;
  preSelectedExperienceId?: number;
  winery?: WineryFragmentFragment;
  fetching?: boolean;
  networkError?: any;
  serverError?: any;
}

export const ExperiencesGridLayout: FC<ExperiencesGridLayoutProps> = ({
  mode,
  experiences,
  preSelectedExperienceId,
  winery,
  fetching,
  networkError,
  serverError,
}) => {
  const [experienceId, setExperienceId] = useState<number | undefined>(
    preSelectedExperienceId
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box mx={[null, null, 10, 20]}>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            {mode === ExperiencesGridMode.RESERVE && (
              <ReservationModal experienceId={experienceId} />
            )}
            {mode === ExperiencesGridMode.EDIT && (
              <EditExperienceModal
                experienceId={experienceId}
                experiences={experiences as PaginatedExperienceFragment[]}
                winery={winery}
              />
            )}
            {mode === ExperiencesGridMode.VIEW && (
              <ExperienceModal experienceId={experienceId} />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Box maxW="100rem" mt={8}>
        {experiences.length === 0 && !fetching && (
          <Heading as="h2" size="sm" color="brand.200" textAlign="center">
            No results found
          </Heading>
        )}

        {networkError && !fetching && experiences.length === 0 && (
          <Heading as="h2" size="sm" color="brand.200" textAlign="center">
            An error has ocurred
          </Heading>
        )}

        {serverError && !fetching && experiences.length === 0 && (
          <Heading as="h2" size="sm" color="brand.200" textAlign="center">
            An error in our servers has ocurred
          </Heading>
        )}

        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(274px, 1fr))"
          gap={3}
        >
          {experiences.length > 0 &&
            !fetching &&
            experiences.map((exp) => (
              <Flex justifyContent="center" key={exp.title}>
                <ExperienceCardCover
                  {...exp}
                  setExperienceId={setExperienceId}
                  openModal={onOpen}
                  image={exp.images[0]}
                />
              </Flex>
            ))}
          {fetching &&
            [1, 2, 3, 4, 5].map((no) => (
              <Box key={no} p={5} borderRadius="12px">
                <Skeleton
                  startColor="brand.400"
                  endColor="#D23F80"
                  height="200px"
                  borderRadius="12px"
                />
              </Box>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};
