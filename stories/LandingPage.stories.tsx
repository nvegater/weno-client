import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { LandingPage } from "../components/LandingPage/LandingPage";

export default {
  title: "Weno/LandingPage",
  component: LandingPage,
} as ComponentMeta<typeof LandingPage>;

const Template: ComponentStory<typeof LandingPage> = (args) => <LandingPage />;

export const LandingPageWeno = Template.bind({});
