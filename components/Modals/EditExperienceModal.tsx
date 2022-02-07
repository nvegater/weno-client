import React, { FC } from "react";
import {
  PaginatedExperienceFragment,
  WineryFragmentFragment,
} from "../../graphql/generated/graphql";
import { Heading, Img } from "@chakra-ui/react";
import { valleyReverseMapping } from "../utils/enum-utils";

interface EditExperienceModalProps {
  selectedExperience: PaginatedExperienceFragment;
  winery: WineryFragmentFragment;
}

const placeHolderImage =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

export const EditExperienceModal: FC<EditExperienceModalProps> = ({
  selectedExperience,
  winery,
}) => {
  return (
    <div>
      <Img
        src={
          selectedExperience?.images[0]
            ? selectedExperience.images[0].getUrl
            : placeHolderImage
        }
        alt={"any"}
      />
      <Heading as="h1">{selectedExperience.title}</Heading>
      <Heading as="h2">{valleyReverseMapping(winery.valley)}</Heading>
    </div>
  );
};
