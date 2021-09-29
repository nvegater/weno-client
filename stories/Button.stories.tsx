import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "@chakra-ui/react";

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    variant: {
      options: ["primaryWeno", "secondaryWeno"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => (
  <Button variant={args.variant}>{args.label}</Button>
);

export const Primary = Template.bind({});
Primary.args = {
  variant: "primaryWeno",
  label: "Hola",
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: "secondaryWeno",
  label: "Hola",
};
