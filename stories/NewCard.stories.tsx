import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import NewCard from "../components/newCard";

export default {
  title: "Weno/Card",
  component: NewCard,
} as ComponentMeta<typeof NewCard>;

const Template: ComponentStory<typeof NewCard> = (args) => <NewCard />;

export const Card = Template.bind({});
