import React, { FC, useEffect, useState } from "react";
import { Center, Flex, Grid, Heading } from "@chakra-ui/react";
import { ContextHeader } from "../Authentication/useAuth";
import { UploadImageForm } from "./UploadImageForm";
import {
  GetImage,
  useWineryImagesQuery,
} from "../../graphql/generated/graphql";
import { ImageOptions } from "./ImageOptions";

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
  const [{ data, fetching, error }] = useWineryImagesQuery({
    variables: { wineryId, wineryAlias },
    context: contextHeader,
    requestPolicy: "network-only",
  });

  const [images, setImages] = useState<GetImage[]>([]);

  useEffect(() => {
    if (data?.wineryImages.gallery) {
      setImages(data.wineryImages.gallery);
    }
  }, [data]);

  return (
    <>
      <Grid gridTemplateColumns="repeat(auto-fit, minmax(274px, 1fr))" gap={3}>
        {error && (
          <Flex justifyContent="center" m={5}>
            <Heading as="h2" size="xl">
              Error downloading images
            </Heading>
          </Flex>
        )}
        {fetching && (
          <Flex justifyContent="center" m={5}>
            <Heading as="h2" size="xl">
              Fetching your images
            </Heading>
          </Flex>
        )}
        {images.map((image) => {
          return (
            <ImageOptions
              key={image.id}
              imageUrl={image.getUrl}
              imageId={image.id}
              contextHeader={contextHeader}
            />
          );
        })}
      </Grid>
      <Flex justifyContent="center" alignItems="center">
        <Center>
          <UploadImageForm
            wineryAlias={wineryAlias}
            wineryId={wineryId}
            contextHeader={contextHeader}
            setImages={setImages}
          />
        </Center>
      </Flex>
    </>
  );
};
