import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Img,
  LinkBox,
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
    console.log("isFavorite");
  };

  return (
    <Box
      as="section"
      bg="brand.100"
      borderRadius="12px"
      width={"274px"}
      height={"345px"}
    >
      <Flex direction="column">
        <Flex justify="center" p={{ sm: "4" }}>
          <Heading as="h3" size="sm" lineHeight="base">
            <LinkOverlay href={href}>{title}</LinkOverlay>
          </Heading>
        </Flex>
        <Img height="225" objectFit="cover" alt={title} src={media} />
        <Flex px={{ sm: "4" }} py="4">
          <IoLocation color="#BE5050" />
          <Text px="7">{description}</Text>
          <Icon
            as={BsSuitHeartFill}
            onClick={() => handlePress()}
            color={isFavorite ? "#F16079" : "#BE5050"}
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
      title="Winery Example"
      description="Winery Place"
      href="#"
    />
  );
};

// const styles = StyleSheet.create({
//   viewFavorite: {
//     position: "absolute",
//     top: 0,
//     right: 0,
//     background : "#fff",
//   }
// })
