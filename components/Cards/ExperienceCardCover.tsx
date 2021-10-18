import {
  Box,
  Flex,
  Heading,
  Img,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";

interface BlogProps {
  title: string;
  href: string;
  media: string;
  description: string;
}

const Card = (props: BlogProps) => {
  const { title, href, description, media } = props;
  return (
    <Box
      as="section"
      bg="brand.100"
      borderRadius="12px"
      maxW={{ base: "xs", md: "sm" }}
    >
      <LinkBox>
        <Flex direction="column">
          <Flex direction="column" p={{ sm: "6" }}>
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
