import React, { FC, useState } from "react";
import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
} from "@chakra-ui/react";
import { RiPlayListAddLine } from "react-icons/ri";
import { WineryExperiencesListModal } from "./WineryExperiencesListModal";
import { ContextHeader } from "../Authentication/useAuth";
import { useTranslation } from "react-i18next";
import { useAddImageToExperienceMutation } from "../../graphql/generated/graphql";

interface ImageOptionsProps {
  imageUrl: string;
  imageId: number;
  wineryId: number;
}

export const ImageOptions: FC<ImageOptionsProps> = ({
  imageId,
  imageUrl,
  wineryId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [t] = useTranslation("global");

  const [, addImageToExperience] = useAddImageToExperienceMutation();

  const [message, setMessage] = useState<string | null>(null);

  async function handleSelection(experienceId: number, title: string) {
    const { data: imagesData, error } = await addImageToExperience(
      {
        experienceId,
        wineryImageId: imageId,
      },
      { requestPolicy: "network-only" }
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
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="end"
      pr={5}
    >
      <WineryExperiencesListModal
        isOpen={isOpen}
        onClose={onClose}
        wineryId={wineryId}
        handleSelection={handleSelection}
        imageUrl={imageUrl}
        message={message}
      />
      <Menu>
        <MenuButton>
          <RiPlayListAddLine />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={() => onOpen()}>{t("addToExperience")}</MenuItem>
          <MenuItem>{t("useAsCover")}</MenuItem>
          <MenuItem>{t("delete")}</MenuItem>
        </MenuList>
      </Menu>
      <Image
        src={imageUrl}
        alt="winery image"
        boxSize="250px"
        objectFit="cover"
        m={5}
        borderRadius="12px"
      />
    </Flex>
  );
};
