import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { InputNumberBox } from "../components/Boxes/InputNumberBox";

export default {
  title: "Weno/Inputs",
  component: InputNumberBox,
} as ComponentMeta<typeof InputNumberBox>;

const Template: ComponentStory<typeof InputNumberBox> = (args) => (
  <InputNumberBox />
);

export const numberBox = Template.bind({});
