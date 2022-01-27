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
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import {
  PaginatedExperience,
  PaginatedExperienceWithSlots,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation("global");

  return (
    <Box>
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
              {t("save")}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Box maxW="100rem" mt={8}>
        {experiences.length === 0 && !fetching && (
          <Heading as="h2" size="sm" color="brand.200" textAlign="center">
            {t("noResults")}
          </Heading>
        )}

        {networkError && !fetching && experiences.length === 0 && (
          <Heading as="h2" size="sm" color="brand.200" textAlign="center">
            {t("errorOccurred")}
          </Heading>
        )}

        {serverError && !fetching && experiences.length === 0 && (
          <Heading as="h2" size="sm" color="brand.200" textAlign="center">
            {t("serverErrorOccurred")}
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
