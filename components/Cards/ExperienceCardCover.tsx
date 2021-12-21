import { Box, Flex, Icon, Img, LinkOverlay, Text } from "@chakra-ui/react";
import { IoLocation } from "react-icons/io5";
import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";

interface BlogProps {
  title: string;
  href: string;
  media: string;
  description: string;
}

const Card = (props: BlogProps) => {
  const { title, href, description, media } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePress = () => {
    setIsFavorite(!isFavorite);
  };

  return (
    <Box
      as="section"
      bg="brand.100"
      borderRadius="12px"
      width={"274px"}
      height={"274px"}
      position="relative"
      display="flex"
    >
      <Flex direction="column">
        <Flex px="4" py="3" height="48px">
          <LinkOverlay href={href}>
            <Text>{title}</Text>
          </LinkOverlay>
        </Flex>
        <Img height="178" alt={title} src={media} />
        <Flex height="48px" px="2" py="3">
          <IoLocation color="brand.400" />
          <Text fontSize="13px" px="4">
            {description}
          </Text>
          <Icon
            as={BsSuitHeartFill}
            position="relative"
            left="100px"
            onClick={() => handlePress()}
            color={isFavorite ? "brand.200" : "brand.400"}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export const ExperienceCardCover = () => {
  return (
    <Card
      media="https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
      title="Wine Tasting"
      description="Winery Place"
      href="#"
    />
  );
};
