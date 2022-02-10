import React, { FC } from "react";
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
import { useExperiencesListQuery } from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";

interface ExperiencesListModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  wineryId: number;
  contextHeader: ContextHeader;
  handleSelection: (experienceId: number, experienceTitle: string) => void;
  message?: string;
}

export const WineryExperiencesListModal: FC<ExperiencesListModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  wineryId,
  contextHeader,
  handleSelection,
  message,
}) => {
  const [{ data, fetching, error: experiencesError }] = useExperiencesListQuery(
    {
      variables: { wineryId },
      context: contextHeader,
      requestPolicy: "network-only",
    }
  );
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

          {imageUrl && (
            <Image
              src={imageUrl}
              alt="winery image"
              boxSize="250px"
              objectFit="cover"
              m={5}
              borderRadius="12px"
            />
          )}

          {message === null && (
            <Heading
              as="h2"
              color="brand.200"
              fontWeight="700"
              size="md"
              my={8}
            >
              To one experience:
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
                {data.experiencesList.errors[0].message}
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
