import { Box, Flex, Img, LinkOverlay, Text } from "@chakra-ui/react";
import React from "react";
import { IoCalendar, IoLocation, IoPeople } from "react-icons/io5";
import { BsFillClockFill } from "react-icons/bs";

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
    <Flex>
      {icon}
      <Text px="3.5">{label}</Text>
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
      display="flex"
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
        display="flex"
      >
        <Flex direction="column" px="5">
          <Flex py="4">
            <LinkOverlay href={href}>
              <Text fontWeight="700" color="brand.200" fontSize="20px">
                {title}
              </Text>
            </LinkOverlay>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="space-around"
            height="100%"
            gridRowGap="1"
          >
            <IconLabel label={date} icon={<IoCalendar color="#BE5050" />} />
            <IconLabel label={place} icon={<IoLocation color="#BE5050" />} />
            <IconLabel
              label={time}
              icon={<BsFillClockFill color="#BE5050" />}
            />
            <IconLabel
              label={totalPeople}
              icon={<IoPeople color="#BE5050" />}
            />
            <Flex justify="center" py="3">
              <Text>Total: $4,000 MXN</Text>
            </Flex>
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
