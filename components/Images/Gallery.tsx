import React, { FC, useEffect, useState } from "react";
import { Center, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import { ContextHeader } from "../Authentication/useAuth";
import { UploadImageForm } from "./UploadImageForm";
import {
  GetImage,
  useWineryImagesQuery,
} from "../../graphql/generated/graphql";
import { ImageOptions } from "./ImageOptions";
import { useTranslation } from "react-i18next";

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
  const [t] = useTranslation("global");

  useEffect(() => {
    if (data?.wineryImages.gallery) {
      setImages(data.wineryImages.gallery);
    }
  }, [data]);

  return (
    <>
      <Flex justifyContent="center" py="2">
        <Heading as="h1" size="xl">
          {t("pictureGallery")}
        </Heading>
      </Flex>
      <Flex justifyContent="center" py="2">
        <Text>{t("pictureFormats")}</Text>
      </Flex>
      <Grid gridTemplateColumns="repeat(auto-fit, minmax(274px, 1fr))" gap={3}>
        {error && (
          <Flex justifyContent="center" m={5}>
            <Heading as="h2" size="xl">
              {t("errorDownloadingImages")}
            </Heading>
          </Flex>
        )}
        {fetching && (
          <Flex justifyContent="center" m={5}>
            <Heading as="h2" size="xl">
              {t("fetchingImages")}
            </Heading>
          </Flex>
        )}
        {images.map((image) => {
          return (
            <ImageOptions
              key={image.id}
              imageUrl={image.getUrl}
              imageId={image.id}
              wineryId={wineryId}
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
