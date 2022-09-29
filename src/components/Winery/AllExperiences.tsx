import React, { FC, useState } from "react";
import { Experiences } from "../Experiences/Experiences";
import {
  ExperienceDrawer,
  ExperiencesGridMode,
} from "../Experiences/ExperienceDrawer";
import { PaginatedExperienceFragment } from "../../graphql/generated/graphql";
import { useDisclosure } from "@chakra-ui/react";

interface AllExperiencesProps {}

export const AllExperiences: FC<AllExperiencesProps> = ({}) => {
  const [experience, setExperience] = useState<PaginatedExperienceFragment>();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const openExperienceModal = (experience: PaginatedExperienceFragment) => {
    onOpen();
    setExperience(experience);
  };
  return (
    <>
      <ExperienceDrawer
        mode={ExperiencesGridMode.VIEW}
        isOpen={isOpen}
        onClose={onClose}
        experience={experience}
        winery={null}
      />
      <Experiences
        hasFilters={false}
        openExperienceModal={openExperienceModal}
      />
    </>
  );
};
