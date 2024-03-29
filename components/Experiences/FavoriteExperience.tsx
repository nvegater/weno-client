import React, { FC, useState } from "react";
import { Flex, Heading, Icon, useToast } from "@chakra-ui/react";
import { HiLocationMarker } from "react-icons/hi";
import { FaHeart } from "react-icons/fa";
import { useTranslation } from "react-i18next";

interface FavoriteExperienceProps {
  text: string;
}

export const FavoriteExperience: FC<FavoriteExperienceProps> = ({ text }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [t] = useTranslation("global");
  const toast = useToast();

  const handleFavoriteSelection = () => {
    toast({
      title: t("onlyWenoUsers"),
      description: t("registerToSave"),
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "top-right",
    });
    setIsFavorite(!isFavorite);
  };

  return (
    <Flex px="2" py="3" alignItems="center">
      <Icon as={HiLocationMarker} color="brand.400" boxSize="1.4rem" ml={1} />
      <Heading fontSize="md" pr={4} pl={1} as="h2" fontWeight="500">
        {text}
      </Heading>
      <Icon
        as={FaHeart}
        marginLeft="auto"
        mr={2}
        onClick={handleFavoriteSelection}
        color={isFavorite ? "brand.500" : "brand.200"}
        boxSize="1.3rem"
      />
    </Flex>
  );
};
