import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Hero } from "../components/Hero/Hero";

export default {
  title: "Weno/Hero",
  component: Hero,
} as ComponentMeta<typeof Hero>;

const Template: ComponentStory<typeof Hero> = (args) => <Hero />;

export const HeroWeno = Template.bind({});
