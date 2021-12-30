import React, { FC } from "react";
import { Box, Img } from "@chakra-ui/react";

interface ExperienceModalProps {
  experienceId: number;
}
const placeHolderImage =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const ExperienceModal: FC<ExperienceModalProps> = ({}) => {
  return (
    <Box maxH="85vh">
      <Img src={placeHolderImage} alt={"any"} />
      <ul>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
        <li>Some big Listttt</li>
      </ul>
    </Box>
  );
};
