import React, { FC } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
} from "@chakra-ui/react";
import { ReservationModal } from "../Modals/ReservationModal";
import { EditExperienceModal } from "../Modals/EditExperienceModal";
import { ExperienceModal } from "../Modals/ExperienceModal";
import {
  PaginatedExperienceFragment,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";

export enum ExperiencesGridMode {
  EDIT,
  RESERVE,
  VIEW,
}
interface ExperienceModalProps {
  mode: ExperiencesGridMode;
  experience: PaginatedExperienceFragment;
  winery: WineryFragmentFragment | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceDrawer: FC<ExperienceModalProps> = ({
  mode,
  experience,
  winery,
  isOpen,
  onClose,
}) => {
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          {mode === ExperiencesGridMode.RESERVE && isOpen && (
            <ReservationModal experience={experience} />
          )}
          {mode === ExperiencesGridMode.EDIT && winery && isOpen && (
            <EditExperienceModal
              selectedExperience={experience}
              winery={winery}
            />
          )}
          {mode === ExperiencesGridMode.VIEW && (
            <ExperienceModal experience={experience} />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
