import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "@chakra-ui/react";
import { RiLoginCircleFill } from "react-icons/ri";

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
  <Button {...args}>{args.label}</Button>
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

export const SideBarCallToAction = Template.bind({});
SideBarCallToAction.args = {
  variant: "cta",
  size: "sideBarCTA",
  leftIcon: <RiLoginCircleFill />,
  label: "Sign in",
};

export const NavBarCallToAction = Template.bind({});
NavBarCallToAction.args = {
  variant: "cta",
  size: "navBarCTA",
  leftIcon: <RiLoginCircleFill />,
  label: "Sign in",
};
