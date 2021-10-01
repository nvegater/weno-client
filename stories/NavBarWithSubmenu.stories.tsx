import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NavBarWithSubmenu } from "../components/NavbarWithSubmenu/App";

export default {
  title: "Weno/NavBar",
  component: NavBarWithSubmenu,
} as ComponentMeta<typeof NavBarWithSubmenu>;

const Template: ComponentStory<typeof NavBarWithSubmenu> = (args) => (
  <NavBarWithSubmenu />
);

export const NavBar = Template.bind({});
