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
  <Button variant={args.variant} size={args.size}>
    {args.label}
  </Button>
);

export const PrimaryHero = Template.bind({});
PrimaryHero.args = {
  variant: "primaryWeno",
  size: "heroWeno",
  label: "Hola",
};

export const SecondaryHero = Template.bind({});
SecondaryHero.args = {
  variant: "secondaryWeno",
  size: "heroWeno",
  label: "Hola",
};
