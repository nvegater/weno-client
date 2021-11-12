import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SelectionBox } from "../components/Boxes/SelectBox";

export default {
  title: "Weno/Boxes",
  component: SelectionBox,
} as ComponentMeta<typeof SelectionBox>;

const Template: ComponentStory<typeof SelectionBox> = (args) => (
  <SelectionBox />
);

export const selectBox = Template.bind({});
