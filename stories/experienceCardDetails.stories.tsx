import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ExperienceCardDetails } from "../components/Cards/ExperienceCardDetails";

export default {
  title: "Weno/Cards",
  component: ExperienceCardDetails,
} as ComponentMeta<typeof ExperienceCardDetails>;

const Template: ComponentStory<typeof ExperienceCardDetails> = (args) => (
  <ExperienceCardDetails />
);

export const BookingCardExperience = Template.bind({});
