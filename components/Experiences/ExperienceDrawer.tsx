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
import { ContextHeader } from "../Authentication/useAuth";

export enum ExperiencesGridMode {
  EDIT,
  RESERVE,
  VIEW,
}
interface ExperienceModalProps {
  mode: ExperiencesGridMode;
  experience: PaginatedExperienceFragment;
  winery: WineryFragmentFragment | null;
  contextHeader: ContextHeader | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ExperienceDrawer: FC<ExperienceModalProps> = ({
  mode,
  experience,
  winery,
  isOpen,
  onClose,
  contextHeader,
}) => {
  console.log(experience, mode, isOpen, contextHeader);
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          {mode === ExperiencesGridMode.RESERVE && isOpen && (
            <ReservationModal experience={experience} />
          )}
          {mode === ExperiencesGridMode.EDIT &&
            winery &&
            isOpen &&
            contextHeader && (
              <EditExperienceModal
                selectedExperience={experience}
                winery={winery}
                contextHeader={contextHeader}
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
