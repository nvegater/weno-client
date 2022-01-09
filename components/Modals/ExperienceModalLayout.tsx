import React, { FC } from "react";
import { Box, Flex, Heading, Icon, Img } from "@chakra-ui/react";
import {
  ExperienceImageFragmentFragment,
  Valley,
} from "../../graphql/generated/graphql";
import { FavoriteExperience } from "../Experiences/FavoriteExperience";
import { valleyReverseMapping } from "../utils/enum-utils";
import { GrMap } from "react-icons/gr";

interface ExperienceModalLayoutProps {
  experienceTitle: string;
  wineryName: string;
  wineryValley: Valley;
  images?: ExperienceImageFragmentFragment[];
}

const placeHolderImage =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const ExperienceModalLayout: FC<ExperienceModalLayoutProps> = ({
  experienceTitle,
  images,
  wineryName,
  wineryValley,
}) => {
  const coverImage = images ? images.find((i) => i.coverPage) : null;

  return (
    <Box>
      <Img
        src={coverImage ? coverImage.imageUrl : placeHolderImage}
        alt={"any"}
      />

      <Heading as="h1" color="brand.200" fontWeight="700" size="2xl" mt={8}>
        {experienceTitle}
      </Heading>
      <FavoriteExperience text={wineryName} />
      <Flex justifyContent="center">
        <Heading as="h3" fontSize="sm" fontWeight="600" color="brand.600">
          {valleyReverseMapping(wineryValley)} {"Valley"}
        </Heading>
        <Icon as={GrMap} color="brand.300" boxSize="1.1rem" ml={1} mb={1} />
      </Flex>
    </Box>
  );
};
