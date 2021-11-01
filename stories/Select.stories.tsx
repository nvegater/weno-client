import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Select } from "@chakra-ui/react";
import { MdArrowDropDown } from "react-icons/md";

export default {
  title: "Weno/Select",
  component: Select,
  argTypes: {
    variant: {
      options: ["Weno"],
      control: { type: "radio" },
    },
    font: {
      options: ["primary", "secondary"],
      control: { type: "radio" },
    },
    size: {
      options: ["phoneWeno", "sideBarCTA"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const SelectWeno = Template.bind({});
SelectWeno.args = {
  variant: "Weno",
  font: "primary",
  size: "phoneWeno",
  placeholder: "Hour",
  icon: <MdArrowDropDown />,
};
