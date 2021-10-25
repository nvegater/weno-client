import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ExperienceCardCover } from "../components/Cards/ExperienceCardCover";

export default {
  title: "Weno/Cards",
  component: ExperienceCardCover,
} as ComponentMeta<typeof ExperienceCardCover>;

const Template: ComponentStory<typeof ExperienceCardCover> = (args) => (
  <ExperienceCardCover />
);

export const LandingCardExperience = Template.bind({});
