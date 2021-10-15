import {
  Box,
  Flex,
  Heading,
  Img,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";

interface BlogProps {
  category: string;
  title: string;
  href: string;
  media: string;
  description: string;
}

const Card = (props: BlogProps) => {
  const { title, href, description, media, category } = props;
  return (
    <LinkBox
      as="article"
      bg={{ sm: mode("white", "gray.700") }}
      shadow={{ sm: "base" }}
      rounded={{ sm: "md" }}
      overflow="hidden"
      transition="all 0.2s"
      _hover={{ shadow: { sm: "lg" } }}
    >
      <Flex direction="column">
        <Flex direction="column" px={{ sm: "6" }} py="5">
          <Heading as="h3" size="sm" mb="2" lineHeight="base">
            <LinkOverlay href={href}>{title}</LinkOverlay>
          </Heading>
        </Flex>
        <Img height="60" objectFit="cover" alt={title} src={media} />
        <Flex direction="column" px={{ sm: "6" }} py="5">
          <Text noOfLines={2} mb="8" color={mode("gray.600", "gray.400")}>
            {description}
          </Text>
        </Flex>
      </Flex>
    </LinkBox>
  );
};

export const ExperienceCardCover = () => {
  return (
    <Box maxW={{ base: "xl", md: "7xl" }} mx="auto" px={{ base: "6", md: "8" }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing="12" mb="10">
        <Card
          category="Fashion"
          media="https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          title="Winery Example"
          description="Winery Place"
          href="#"
        />
      </SimpleGrid>
    </Box>
  );
};
