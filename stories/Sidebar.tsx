import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Sidebar } from "../components/Sidebar/Sidebar";

export default {
  title: "Weno/Sidebar",
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

const Template: ComponentStory<typeof Sidebar> = (args) => <Sidebar />;

export const Sidebarweno = Template.bind({});
