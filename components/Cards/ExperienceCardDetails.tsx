import {
  Box,
  Flex,
  Heading,
  LinkBox,
  LinkOverlay,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import * as React from "react";
import { IoCalendar, IoPeople, IoLocation } from "react-icons/io5";
import { BsFillClockFill } from "react-icons/bs";

interface BlogProps {
  date: string;
  title: string;
  place: string;
  href: string;
  time: string;
  totalPeople: string;
}

interface IconLabelProps {
  icon: React.ReactElement;
  label: string;
}

const IconLabel = (props: IconLabelProps) => {
  const { label, icon } = props;
  return (
    <Flex py="3">
      {icon}
      <Text px="5">{label}</Text>
    </Flex>
  );
};

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
          <IconLabel label={date} icon={<IoCalendar color="#BE5050" />} />
          <IconLabel label={place} icon={<IoLocation color="#BE5050" />} />
          <IconLabel label={time} icon={<BsFillClockFill color="#BE5050" />} />
          <IconLabel label={totalPeople} icon={<IoPeople color="#BE5050" />} />
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
