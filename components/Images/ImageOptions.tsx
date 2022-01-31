import React, { FC } from "react";
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
import { ExperiencesListModal } from "./ExperiencesListModal";
import { ContextHeader } from "../Authentication/useAuth";
import { useTranslation } from "react-i18next";

interface ImageOptionsProps {
  imageUrl: string;
  imageId: number;
  wineryId: number;
  contextHeader: ContextHeader;
}

export const ImageOptions: FC<ImageOptionsProps> = ({
  imageId,
  imageUrl,
  contextHeader,
  wineryId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [t] = useTranslation("global");

  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="end"
      pr={5}
    >
      <ExperiencesListModal
        isOpen={isOpen}
        onClose={onClose}
        imageId={imageId}
        imageUrl={imageUrl}
        contextHeader={contextHeader}
        wineryId={wineryId}
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
