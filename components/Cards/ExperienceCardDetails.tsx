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
import React, { useState } from "react";
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
      <Text px="5">{label}</Text>
    </Flex>
  );
};

const Card = (props: BlogProps) => {
  const { title, date, place, href, time, totalPeople, media } = props;
  const [isFavorite, setIsFavorite] = useState(false);

  const handlePress = () => {
    setIsFavorite(!isFavorite);
    console.log("isFavorite");
  };

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
          height="225"
          objectFit="cover"
          alt={title}
          src={media}
          borderRadius="12px"
        />
        <Icon
          as={BsSuitHeartFill}
          position="absolute"
          onClick={() => handlePress()}
          color={isFavorite ? "#3E1414" : "#BE5050"}
          top="10px"
          right="10px"
        />
      </Box>
      <Box
        as="section"
        bg="brand.100"
        borderRadius="12px"
        width={"274px"}
        height={"288px"}
        position="absolute"
        bottom="-250px"
      >
        <Flex direction="column" px="8">
          <Flex justify="center" py="4">
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
      </Box>
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
      media="https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    />
  );
};
