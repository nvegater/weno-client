import React, { FC, useEffect, useState } from "react";
import { Center, Flex, Grid, Heading, Image } from "@chakra-ui/react";
import { ContextHeader } from "../Authentication/useAuth";
import { UploadImageForm } from "./UploadImageForm";
import { useWineryImagesQuery } from "../../graphql/generated/graphql";

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

  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (data?.wineryImages.gallery) {
      setImages(data.wineryImages.gallery.map((img) => img.getUrl));
    }
  }, [data]);

  return (
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
      {images.map((image, index) => {
        return (
          <Image
            key={index}
            src={image}
            alt={index.toString()}
            boxSize="250px"
            objectFit="cover"
            m={5}
            borderRadius="12px"
          />
        );
      })}
      <Center>
        <UploadImageForm
          wineryAlias={wineryAlias}
          wineryId={wineryId}
          contextHeader={contextHeader}
          setImages={setImages}
        />
      </Center>
    </Grid>
  );
};
