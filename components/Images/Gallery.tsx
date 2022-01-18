import React, { FC } from "react";
import { Center, Grid, Image } from "@chakra-ui/react";
import { ContextHeader } from "../Authentication/useAuth";
import { UploadImageForm } from "./UploadImageForm";

const placeHolder =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

const images_const = [placeHolder, placeHolder, placeHolder, placeHolder];

interface GalleryProps {
  wineryAlias: string;
  wineryId: number;
  contextHeader: ContextHeader;
}

export const Gallery: FC<GalleryProps> = ({
  wineryAlias,
  wineryId,
  contextHeader,
}) => {
  // TODO get images from winery
  return (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(274px, 1fr))" gap={3}>
      {images_const.map((imageUrl, index) => {
        return <Image key={index} src={imageUrl} alt={index.toString()} />;
      })}
      <Center>
        <UploadImageForm
          wineryAlias={wineryAlias}
          wineryId={wineryId}
          contextHeader={contextHeader}
        />
      </Center>
    </Grid>
  );
};
