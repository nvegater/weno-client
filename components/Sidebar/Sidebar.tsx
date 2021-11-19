import {
  Box,
  Checkbox,
  Flex,
  Text,
  Select,
  useColorModeValue as mode,
} from "@chakra-ui/react";
import React from "react";
import { FaWineGlass, FaBed, FaPizzaSlice } from "react-icons/fa";
import { RiMusic2Fill, RiFilterOffFill } from "react-icons/ri";
import { BiCycling } from "react-icons/bi";
import { MdArrowDropDown } from "react-icons/md";

interface IconLabelProps {
  icon: React.ReactElement;
  label: string;
}

const IconLabel = (props: IconLabelProps) => {
  const { label, icon } = props;
  return (
    <Flex direction="row" justifyContent="space-between">
      <Flex>
        {icon}
        <Text px="2" fontFamily="GothamText">
          {label}
        </Text>
      </Flex>
      <Flex>
        <Checkbox
          alignSelf="end"
          iconColor="brand.300"
          colorScheme="white"
          borderColor="brand.300"
        />
      </Flex>
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
        <Flex direction="row" justifyContent="space-between">
          <Text fontFamily="GothamText" color="brand.200">
            Filter
          </Text>
          <RiFilterOffFill color="#9F449D" />
        </Flex>
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          height="100%"
          gridRowGap="3"
          p="5"
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
        <Text fontFamily="GothamText" color="brand.200">
          Experience Date
        </Text>
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          height="100%"
          gridRowGap="3"
          p="5"
        >
          <Select
            placeholder="Hour"
            borderColor="brand.300"
            icon={<MdArrowDropDown />}
            iconColor="brand.300"
          />
          <Select
            placeholder="Date"
            borderColor="brand.300"
            icon={<MdArrowDropDown />}
            iconColor="brand.300"
          />
        </Flex>
      </Flex>
      <Flex direction="column" p="3">
        <Text fontFamily="GothamText" color="brand.200">
          Valley
        </Text>
        <Flex
          flexDirection="column"
          justifyContent="space-around"
          height="100%"
          gridRowGap="3"
          p="5"
        >
          <Select
            placeholder="Choose"
            borderColor="brand.300"
            icon={<MdArrowDropDown />}
            iconColor="brand.300"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export const Sidebar = () => {
  return <Bar />;
};
