import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { BsArrowRight, BsClockFill } from "react-icons/bs";

interface BlogProps {
  date: string;
  title: string;
  place: string;
  href: string;
  time: string;
  totalPeople: string;
}

const Card = (props: BlogProps) => {
  const { title, date, place, href, time, totalPeople } = props;
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
          <Text noOfLines={1} mb="8" color={mode("gray.600", "gray.400")}>
            {date}
          </Text>
          <Text noOfLines={1} mb="8" color={mode("gray.600", "gray.400")}>
            {place}
          </Text>
          <Text noOfLines={1} mb="8" color={mode("gray.600", "gray.400")}>
            {time}
          </Text>
          <Text noOfLines={1} mb="8" color={mode("gray.600", "gray.400")}>
            {totalPeople}
          </Text>
          <Flex
            align="baseline"
            justify="space-between"
            fontSize="sm"
            color={mode("gray.600", "gray.400")}
          >
            <Text>Total Price</Text>
          </Flex>
        </Flex>
      </Flex>
    </LinkBox>
  );
};

export const ExperienceCardDetails = () => {
  return (
    <Box
      as="section"
      bg={mode("gray.50", "gray.800")}
      py={{ base: "10", sm: "24" }}
    >
      <Box
        maxW={{ base: "xl", md: "7xl" }}
        mx="auto"
        px={{ base: "6", md: "8" }}
      >
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing="12" mb="10">
          <Card
            date="October 21st, "
            href="#"
            title="Experience Name"
            place="Santo Tomas"
            time="19:00 hrs"
            totalPeople="2 people"
          />
        </SimpleGrid>
      </Box>
    </Box>
  );
};
