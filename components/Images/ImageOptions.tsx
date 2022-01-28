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
          <MenuItem onClick={() => onOpen()}>Add to experience</MenuItem>
          <MenuItem>Use as cover picture</MenuItem>
          <MenuItem>Delete</MenuItem>
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
