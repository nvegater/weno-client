import React, { FC, useState } from "react";
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  useAddImageToExperienceMutation,
  useExperiencesListQuery,
} from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";

interface ExperiencesListModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageId: number;
  imageUrl: string;
  contextHeader: ContextHeader;
}

export const ExperiencesListModal: FC<ExperiencesListModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  imageId,
  contextHeader,
}) => {
  const [, addImageToExperience] = useAddImageToExperienceMutation();
  const [{ data, fetching, error: experiencesError }] =
    useExperiencesListQuery();
  const [message, setMessage] = useState<string | null>();

  async function handleSelection(experienceId: number, title: string) {
    const { data: imagesData, error } = await addImageToExperience(
      {
        experienceId,
        wineryImageId: imageId,
      },
      { ...contextHeader, requestPolicy: "network-only" }
    );
    if (error) {
      setMessage(error.message);
    }
    if (
      imagesData?.addImageToExperience &&
      imagesData.addImageToExperience.errors
    ) {
      setMessage(imagesData.addImageToExperience.errors[0].message);
    }
    const images = imagesData?.addImageToExperience
      ? imagesData.addImageToExperience.images
      : [];
    if (images.length > 0) {
      setMessage(`${images[0].imageName} was added to ${title}`);
    }
  }
  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="md">
      <DrawerContent>
        <DrawerCloseButton />
        <DrawerBody>
          {message === null && (
            <Heading
              as="h1"
              color="brand.200"
              fontWeight="700"
              size="xl"
              my={8}
            >
              Add this image:
            </Heading>
          )}

          <Image
            src={imageUrl}
            alt="winery image"
            boxSize="250px"
            objectFit="cover"
            m={5}
            borderRadius="12px"
          />

          {message === null && (
            <Heading
              as="h2"
              color="brand.200"
              fontWeight="700"
              size="md"
              my={8}
            >
              To this experience:
            </Heading>
          )}

          {message && (
            <Flex justifyContent="center" m={5}>
              <Heading as="h3" size="xl">
                {message}
              </Heading>
            </Flex>
          )}
          {fetching && (
            <Flex justifyContent="center" m={5}>
              <Heading as="h2" size="xl">
                Loading experiences
              </Heading>
            </Flex>
          )}
          {experiencesError && (
            <Flex justifyContent="center" m={5}>
              <Heading as="h2" size="xl">
                Error retrieving experiences
              </Heading>
            </Flex>
          )}
          {data?.experiencesList.errors && (
            <Flex justifyContent="center" m={5}>
              <Heading as="h2" size="xl">
                Error retrieving experiences
              </Heading>
            </Flex>
          )}
          {data?.experiencesList.experiencesList && (
            <Stack spacing={8}>
              {data.experiencesList.experiencesList.map((exp) => (
                <Box
                  key={exp.id}
                  p={5}
                  shadow="sm"
                  borderWidth="1px"
                  cursor="pointer"
                  _hover={{
                    background: "brand.800",
                    color: "brand.500",
                  }}
                  onClick={() => handleSelection(exp.id, exp.title)}
                >
                  <Heading fontSize="xl">{exp.title}</Heading>
                  <Text mt={4}>{exp.imageCount + " "} images</Text>
                </Box>
              ))}
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};
