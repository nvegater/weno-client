import React, { FC, useState } from "react";
import { ReservationModal } from "../Modals/ReservationModal";
import { EditExperienceModal } from "../Modals/EditExperienceModal";
import { ExperienceModal } from "../Modals/ExperienceModal";
import { ExperienceCardCover } from "../Cards/ExperienceCardCover";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  Flex,
  Grid,
  Heading,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import { ImFilter } from "react-icons/im";
import {
  PaginatedExperience,
  PaginatedExperienceWithSlots,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";

export enum ExperiencesGridMode {
  EDIT,
  RESERVE,
  VIEW,
}

interface ExperiencesGridLayoutProps {
  experiences: (PaginatedExperience | PaginatedExperienceWithSlots)[];
  mode: ExperiencesGridMode;
  preSelectedExperienceId?: number;
  winery?: WineryFragmentFragment;
}

export const ExperiencesGridLayout: FC<ExperiencesGridLayoutProps> = ({
  mode,
  experiences,
  preSelectedExperienceId,
  winery,
}) => {
  const [experienceId, setExperienceId] = useState<number | undefined>(
    preSelectedExperienceId
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box p={5}>
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
                experiences={experiences as PaginatedExperienceWithSlots[]}
                winery={winery}
              />
            )}
            {mode === ExperiencesGridMode.VIEW && (
              <ExperienceModal experienceId={experienceId} />
            )}
          </DrawerBody>

          <DrawerFooter>
            <Button type="submit" form="my-form">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Flex justifyContent="space-between">
        <Heading as="h1" color="brand.200" fontWeight="700" size="2xl">
          Experiences
        </Heading>
        <Icon as={ImFilter} w={6} h={6} color="brand.300" mt={2} />
      </Flex>

      <Box maxW="100rem" mt={8}>
        {experiences.length === 0 && (
          <Heading as="h2" size="sm" color="brand.200" textAlign="center">
            No results found
          </Heading>
        )}
        <Grid
          gridTemplateColumns="repeat(auto-fit, minmax(274px, 1fr))"
          gap={3}
        >
          {experiences.length > 0 &&
            experiences.map((exp) => (
              <Flex justifyContent="center" key={exp.title}>
                <ExperienceCardCover
                  {...exp}
                  setExperienceId={setExperienceId}
                  openModal={onOpen}
                />
              </Flex>
            ))}
        </Grid>
      </Box>
    </Box>
  );
};
