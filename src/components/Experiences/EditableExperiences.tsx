import React, { FC, useState } from "react";
import {
  PaginatedExperienceFragment,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import { Experiences } from "./Experiences";
import { Heading, useDisclosure } from "@chakra-ui/react";
import { ExperienceDrawer, ExperiencesGridMode } from "./ExperienceDrawer";
import { ContextHeader } from "../Authentication/useAuth";
import { useTranslation } from "react-i18next";

interface EditableExperiencesProps {
  winery: WineryFragmentFragment;
}

export const EditableExperiences: FC<EditableExperiencesProps> = ({
  winery,
}) => {
  const [experience, setExperience] = useState<PaginatedExperienceFragment>();
  const [t] = useTranslation("global");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openExperienceModal = (experience: PaginatedExperienceFragment) => {
    onOpen();
    setExperience(experience);
  };

  return (
    <>
      <Heading as="h1" color="brand.200" fontWeight="700" size="2xl">
        {t("editExperiences")}
      </Heading>
      <ExperienceDrawer
        mode={ExperiencesGridMode.EDIT}
        isOpen={isOpen}
        onClose={onClose}
        experience={experience}
        winery={winery}
      />
      <Experiences
        hasFilters={false}
        initialFilters={{
          hasSlotsInFuture: true,
          wineryIds: [winery.id],
        }}
        openExperienceModal={openExperienceModal}
      />
    </>
  );
};
