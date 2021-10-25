import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { NavBarWithSubmenu } from "../components/NavbarWithSubmenu/NavBarWithSubmenu";

export default {
  title: "Weno/NavBar",
  component: NavBarWithSubmenu,
} as ComponentMeta<typeof NavBarWithSubmenu>;

// fonts issue: https://github.com/storybookjs/storybook/issues/14644

const Template: ComponentStory<typeof NavBarWithSubmenu> = (args) => (
  <NavBarWithSubmenu />
);

export const NavBar = Template.bind({});
