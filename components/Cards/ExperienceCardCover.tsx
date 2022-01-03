import { Box, Flex, Icon, Img, Text, Tooltip } from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";
import React, { FC, useState } from "react";
import { FaHeart } from "react-icons/fa";

interface ExperienceCardCoverProps {
  id: number;
  title: string;
  wineryName: string;
  setExperienceId: React.Dispatch<React.SetStateAction<number>>;
  openModal: () => void;
}

export const ExperienceCardCover: FC<ExperienceCardCoverProps> = ({
  id,
  title,
  wineryName,
  setExperienceId,
  openModal,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavoriteSelection = () => {
    setIsFavorite(!isFavorite);
  };

  const placeHolderImage =
    "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

  const handleExperienceClick = () => {
    setExperienceId(id);
    openModal();
  };
  return (
    <Flex
      bg="brand.100"
      borderRadius="12px"
      w="274px"
      filter="drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.1))"
      direction="column"
    >
      <Box onClick={handleExperienceClick}>
        <Tooltip
          label={title}
          aria-label={"tooltip from experience called" + title}
        >
          <Text py={2} px={4} fontSize="lg" isTruncated>
            {title}
          </Text>
        </Tooltip>
        <Img
          src={placeHolderImage}
          alt={title}
          width="100%"
          objectFit="cover"
        />
      </Box>
      <Flex px="2" py="3" alignItems="center">
        <Icon as={HiLocationMarker} color="brand.400" boxSize="1.4rem" ml={1} />
        <Text fontSize="md" pr={4} pl={1}>
          {wineryName}
        </Text>
        <Icon
          as={FaHeart}
          marginLeft="auto"
          mr={2}
          onClick={handleFavoriteSelection}
          color={isFavorite ? "brand.500" : "brand.200"}
          boxSize="1.3rem"
        />
      </Flex>
    </Flex>
  );
};
