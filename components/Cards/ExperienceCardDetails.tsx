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
import * as Logos from "../Hero/Brands";

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
    <Box
      as="section"
      bg="brand.100"
      borderRadius="12px"
      maxW={{ base: "xs", md: "sm" }}
    >
      <LinkBox>
        <Flex direction="column" p={{ sm: "6" }}>
          <Flex justify="center" py={{ sm: "3" }}>
            <Heading color="titles.100" size="24px">
              <LinkOverlay href={href}>{title}</LinkOverlay>
            </Heading>
          </Flex>
          <Flex py="3">
            <Logos.ChatMonkey />
            <Text px="5">{date}</Text>
          </Flex>
          <Text mb="8">{place}</Text>
          <Text mb="8">{time}</Text>
          <Text mb="8">{totalPeople}</Text>
          <Flex justify="center">
            <Text>Total Price</Text>
          </Flex>
        </Flex>
      </LinkBox>
    </Box>
  );
};

export const ExperienceCardDetails = () => {
  return (
    <Card
      date="October 21st, "
      href="#"
      title="Experience Name"
      place="Santo Tomas"
      time="19:00 hrs"
      totalPeople="2 people"
    />
  );
};
