import {
  Box,
  Center,
  Flex,
  Grid,
  Img,
  LinkOverlay,
  Text,
} from "@chakra-ui/react";
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
      <Center color="white">{icon}</Center>
      <Text pl="3.5">{label}</Text>
    </Flex>
  );
};

const Card = (props: BlogProps) => {
  const { title, date, place, href, time, totalPeople, media } = props;

  return (
    <Grid borderRadius="12px" maxW="274px" flexDirection="column">
      <Img
        alt={title}
        src={media}
        borderTopRadius="12px"
        width="100%"
        objectFit="cover"
        gridColumnStart={1}
        gridRowStart={1}
      />
      <Box
        borderRadius="14px"
        bg="brand.100"
        gridColumnStart={1}
        gridRowStart={1}
        mt="10rem"
      >
        <Flex flexDirection="column" px="5">
          <LinkOverlay href={href}>
            <Text fontWeight="700" color="brand.200" fontSize="20px" py="4">
              {title}
            </Text>
          </LinkOverlay>
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
    </Grid>
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
