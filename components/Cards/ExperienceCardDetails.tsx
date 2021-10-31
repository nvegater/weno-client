import {
  Box,
  Flex,
  Icon,
  Img,
  LinkOverlay,
  Text,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React from "react";
import { IoCalendar, IoPeople, IoLocation } from "react-icons/io5";
import { BsFillClockFill, BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";

interface BlogProps {
  date: string;
  title: string;
  place: string;
  href: string;
  time: string;
  totalPeople: string;
  media: string;
}

interface IconLabelProps {
  icon: React.ReactElement;
  label: string;
}

const IconLabel = (props: IconLabelProps) => {
  const { label, icon } = props;
  return (
    <Flex py="2.5">
      {icon}
      <Text px="3.5" fontFamily="GothamText">
        {label}
      </Text>
    </Flex>
  );
};

const Card = (props: BlogProps) => {
  const { title, date, place, href, time, totalPeople, media } = props;

  return (
    <Box
      as="section"
      borderRadius="12px"
      width={"274px"}
      position="relative"
      display="inline-block"
    >
      <Box position="relative" display="inline-block">
        <Img
          height="274"
          objectFit="cover"
          alt={title}
          src={media}
          borderRadius="12px"
        />
      </Box>
      <Box
        as="section"
        bg="brand.100"
        borderRadius="12px"
        width={"274px"}
        height={"288px"}
        position="absolute"
        bottom="-192px"
      >
        <Flex direction="column" px="20px">
          <Flex py="21px">
            <LinkOverlay href={href}>
              <Text
                fontFamily="GothamLogo"
                fontWeight="700"
                color="brand.200"
                fontSize="20px"
              >
                {title}
              </Text>
            </LinkOverlay>
          </Flex>
          <IconLabel label={date} icon={<IoCalendar color="#BE5050" />} />
          <IconLabel label={place} icon={<IoLocation color="#BE5050" />} />
          <IconLabel label={time} icon={<BsFillClockFill color="#BE5050" />} />
          <IconLabel label={totalPeople} icon={<IoPeople color="#BE5050" />} />
          <Flex justify="center">
            <Text fontFamily="GothamText">Total: $4,000 MXN</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export const ExperienceCardDetails = () => {
  return (
    <Card
      date="October, Sat 21st, 2021 "
      href="#"
      title="Wine Tasting"
      place="Santo Tomas"
      time="19:00 hrs"
      totalPeople="2 people"
      media="https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    />
  );
};
