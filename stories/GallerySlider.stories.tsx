import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Slider } from "../components/gallerySlider/Slider";

export default {
  title: "Weno/Slider",
  component: Slider,
} as ComponentMeta<typeof Slider>;

const Template: ComponentStory<typeof Slider> = (args) => <Slider />;

export const GallerySlider = Template.bind({});
