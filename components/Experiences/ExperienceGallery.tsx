import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Image,
  Input,
  Skeleton,
} from "@chakra-ui/react";
import React, { FC, useEffect, useRef, useState } from "react";
import { BiPhotoAlbum } from "react-icons/bi";
import { useTranslation } from "react-i18next";

const imgToBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export interface WineryGalleryProps {
  allowEdit: boolean;
  currentGallery: Array<any>;
  onGalleryChanged: (files: Array<File>) => void;
  onCoverChanged: (imageService: any) => void;
}
const ExperienceGallery: FC<WineryGalleryProps> = ({
  allowEdit,
  currentGallery,
  onGalleryChanged,
}) => {
  /**
   * upload images variables
   */
  const [files, setFiles] = useState<Array<File>>([]);
  const [gallery, setGallery] = useState<any[]>([]);
  //  console.log("Rendering with following gallery: ", gallery);
  const inputFile = useRef<HTMLInputElement>(null);
  const LOADING = "LOADING";
  const [t] = useTranslation("global");
  /**
   * cover and delete image variables
   */
  const setCoverImage = (props: any) => {
    //set cover image
    let returnValue: any;
    return returnValue;
  };

  const deleteImage = (props: any) => {
    //delete cover image
    let returnValue: any;
    return returnValue;
  };

  const handleImageUpload = async (fileList: FileList) => {
    console.log("Handle Image upload callback", fileList);
    onImageUploaded(LOADING);
    const newFiles = [...files, ...Array.from(fileList)];
    setFiles(newFiles);
    for (const file of Array.from(fileList)) {
      const b64Image = await imgToBase64(file);
      if (typeof b64Image === "string") {
        onImageUploaded(b64Image);
      }
    }
    onGalleryChanged(newFiles);
  };

  const onImageUploaded = (imageUrl: string) => {
    console.log("On Image Uploaded Callback with massive URL ");
    const galleryImageId = gallery.length === 0 ? 0 : gallery.length;
    console.log("With following ID: ", galleryImageId);
    if (imageUrl === LOADING) {
      setGallery([
        ...gallery,
        { id: galleryImageId, imageUrl, coverPage: false },
      ]);
    } else {
      const newGallery = gallery;
      newGallery.splice(gallery.length, 1, {
        id: galleryImageId,
        imageUrl,
        coverPage: false,
      });
      setGallery([...newGallery]);
    }
  };

  const handleRemoveImage = async (imageId: number) => {
    console.log("Removing image with Id", imageId);
    const newGallery = gallery.splice(imageId, 1);
    setGallery([...newGallery]);
  };

  useEffect(() => {
    //console.log("Current gallery UseEffect", currentGallery);
    if (currentGallery?.length && currentGallery?.length > gallery.length) {
      console.log("Setting PArent gallery");
      setGallery(currentGallery);
    }
  }, [currentGallery, setGallery]);

  return (
    <Box my={3} maxW="40em">
      <Heading size="lg" mb={2}>
        {t("gallery")}
      </Heading>
      <Flex my={4} wrap="wrap">
        {gallery?.map((image, index) => {
          return (
            <Box p={2} width="100%" maxW="33.33%" key={index}>
              {(image?.imageUrl as string) === LOADING ? (
                <Skeleton height={160} width="100%" borderRadius="lg" />
              ) : (
                <Box>
                  {image?.coverPage && (
                    <Icon
                      as={BiPhotoAlbum}
                      color="rgb(145,191,41)"
                      zIndex={2}
                      position="absolute"
                      w={8}
                      h={8}
                    />
                  )}
                  <Image
                    src={image?.imageUrl as string}
                    alt="Experience image"
                    height={160}
                    width="100%"
                    objectFit="cover"
                    borderRadius="lg"
                    borderBottomRadius="none"
                  />
                  <Flex>
                    <Button
                      size="sm"
                      variant="outline"
                      borderRadius="none"
                      borderBottomStartRadius="lg"
                      pb="2px"
                      border="1px"
                      fontSize="xs"
                      onClick={() => handleRemoveImage(image?.id as number)}
                    >
                      {t("delete")}
                    </Button>
                    {(image?.id as number) >= 0 && (
                      <Button
                        size="sm"
                        variant="outline"
                        borderRadius="none"
                        borderBottomEndRadius="lg"
                        pb="2px"
                        border="1px"
                        fontSize="xs"
                      >
                        {t("cover")}
                      </Button>
                    )}
                  </Flex>
                </Box>
              )}
            </Box>
          );
        })}
        {allowEdit && (
          <>
            <Button
              w="100%"
              maxW="33.33%"
              variant="outline"
              borderRadius="lg"
              my="8px"
              pb="2px"
              h="160px"
              borderStyle="dashed"
              border="1px"
              onClick={() => inputFile?.current?.click()}
              d="flex"
              flexDirection="column"
            >
              {t("addPhoto")}
            </Button>
            <Input
              ref={inputFile}
              placeholder="Basic usage"
              type="file"
              display="none"
              onChange={(file) => {
                if (file.target.files?.length)
                  handleImageUpload(file?.target?.files);
              }}
            />
          </>
        )}
      </Flex>
    </Box>
  );
};

export default ExperienceGallery;
