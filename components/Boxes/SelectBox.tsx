import { Select } from "@chakra-ui/react";
import React from "react";
import { MdArrowDropDown } from "react-icons/md";

interface BlogProps {
  title: string;
  width: string;
}

const SelectBox = (props: BlogProps) => {
  const { title, width } = props;

  return (
    <Select
      placeholder={title}
      borderColor="brand.300"
      iconColor="brand.300"
      icon={<MdArrowDropDown />}
      width={width}
    />
  );
};

export const SelectionBox = () => {
  return <SelectBox title="Wine Tasting" width="152px" />;
};
