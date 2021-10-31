import {
  Box,
  Flex,
  Heading,
  Icon,
  Img,
  LinkOverlay,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import { IoLocation } from "react-icons/io5";
import React, { useState } from "react";
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

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
    >
      <Flex direction="column">
        <Flex px="20px" py="15px" height="48px">
          <LinkOverlay href={href}>
            <Text fontFamily="GothamText">{title}</Text>
          </LinkOverlay>
        </Flex>
        <Img height="178" objectFit="cover" alt={title} src={media} />
        <Flex height="48px" px="11px" py="14px">
          <IoLocation color="#BE5050" height="22px" />
          <Text fontFamily="GothamText" fontSize="13px" px="4">
            {description}
          </Text>
          <Icon
            height="21px"
            as={BsSuitHeartFill}
            position="absolute"
            left="240px"
            onClick={() => handlePress()}
            color={isFavorite ? "#3E1414" : "#BE5050"}
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
