import { Box, Flex, Heading, Img, Tooltip } from "@chakra-ui/react";
import React, { FC } from "react";
import { FavoriteExperience } from "../Experiences/FavoriteExperience";
import { PaginatedExperienceFragment } from "../../graphql/generated/graphql";

interface ExperienceCardCoverProps {
  experience: PaginatedExperienceFragment;
  openExperienceModal: (experience: PaginatedExperienceFragment) => void;
}

export const ExperienceCardCover: FC<ExperienceCardCoverProps> = ({
  openExperienceModal,
  experience,
}) => {
  const placeHolderImage =
    "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  return (
    <Flex
      bg="brand.100"
      borderRadius="12px"
      w="274px"
      filter="drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.1))"
      direction="column"
    >
      <Box onClick={() => openExperienceModal(experience)}>
        <Tooltip
          label={experience.title}
          aria-label={"tooltip from experience called" + experience.title}
        >
          <Heading
            as="h1"
            fontWeight="500"
            py={2}
            px={4}
            fontSize="lg"
            isTruncated
          >
            {experience.title}
          </Heading>
        </Tooltip>
        <Img
          src={
            experience.images[0]?.getUrl
              ? experience.images[0].getUrl
              : placeHolderImage
          }
          alt={experience.title}
          boxSize="250px"
          h="220px"
          w="100%"
          objectFit="cover"
        />
      </Box>
      <FavoriteExperience text={experience.wineryName} />
    </Flex>
  );
};
