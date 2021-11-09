import { Select } from "@chakra-ui/react";
import { IoLocation } from "react-icons/io5";
import React, { useState } from "react";
import { BsSuitHeartFill } from "react-icons/bs";

interface BlogProps {
  title: string;
}

const Card = (props: BlogProps) => {
  const { title } = props;

  return <Select placeholder={title} />;
};

export const ExperienceCardCover = () => {
  return <Card title="Wine Tasting" />;
};
