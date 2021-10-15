import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ExperienceCardCover } from "../components/Cards/ExperienceCardCover";

export default {
  title: "Weno/ExperienceCardCover",
  component: ExperienceCardCover,
} as ComponentMeta<typeof ExperienceCardCover>;

const Template: ComponentStory<typeof ExperienceCardCover> = (args) => (
  <ExperienceCardCover />
);

export const NavBar = Template.bind({});
