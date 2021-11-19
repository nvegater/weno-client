import {
  Box,
  Flex,
  Text,
  Select,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React from "react";
import { FaWineGlass, FaBed, FaPizzaSlice } from "react-icons/fa";
import { RiMusic2Fill } from "react-icons/ri";
import { BiCycling } from "react-icons/bi";

interface IconLabelProps {
  icon: React.ReactElement;
  label: string;
}

const IconLabel = (props: IconLabelProps) => {
  const { label, icon } = props;
  return (
    <Flex>
      {icon}
      <Text px="2" fontFamily="GothamText">
        {label}
      </Text>
    </Flex>
  );
};

const Bar = () => {
  return (
    <Box
      as="section"
      bg="brand.100"
      borderRadius="12px"
      width={"274px"}
      position="relative"
    >
      <Flex direction="column" p="3">
        <Text fontFamily="GothamText">Filter</Text>
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          height="100%"
          gridRowGap="3"
          px="5"
        >
          <IconLabel
            label="Wine tasting"
            icon={<FaWineGlass color="#BE5050" />}
          />
          <IconLabel label="Pairing" icon={<FaPizzaSlice color="#BE5050" />} />
          <IconLabel label="Concert" icon={<RiMusic2Fill color="#BE5050" />} />
          <IconLabel label="Lodging" icon={<FaBed color="#BE5050" />} />
          <IconLabel label="Riding" icon={<BiCycling color="#BE5050" />} />
        </Flex>
      </Flex>
      <Flex direction="column" p="3">
        <Text fontFamily="GothamText">Experience Date</Text>
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          height="100%"
          gridRowGap="3"
          p="5"
        >
          <Select placeholder="Hour" />
          <Select placeholder="Date" />
        </Flex>
      </Flex>
      <Flex direction="column" p="3">
        <Text fontFamily="GothamText">Valley</Text>
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          height="100%"
          gridRowGap="3"
          p="5"
        >
          <Select placeholder="Choose" />
        </Flex>
      </Flex>
    </Box>
  );
};

export const Sidebar = () => {
  return <Bar />;
};
