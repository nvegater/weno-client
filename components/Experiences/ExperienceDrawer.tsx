import React, { FC } from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
} from "@chakra-ui/react";
import { EditExperience } from "./EditExperience";
import { ViewExperience } from "./ViewExperience";
import {
  PaginatedExperienceFragment,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { ReserveExperience } from "../Reservations/ReserveExperience";

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
            <ReserveExperience experience={experience} />
          )}
          {mode === ExperiencesGridMode.EDIT && winery && isOpen && (
            <EditExperience selectedExperience={experience} />
          )}
          {mode === ExperiencesGridMode.VIEW && (
            <ViewExperience experience={experience} />
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
