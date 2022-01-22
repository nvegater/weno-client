import React, { FC } from "react";
import {
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { RiPlayListAddLine } from "react-icons/Ri";

interface ImageOptionsProps {
  imageUrl: string;
  imageId: number;
}

export const ImageOptions: FC<ImageOptionsProps> = ({ imageId, imageUrl }) => {
  // TODO add To experience Mutation and useAsCoverPicture Mutation
  // Add Side
  return (
    <Flex
      flexDirection="column"
      justifyContent="center"
      alignItems="end"
      pr={5}
    >
      <Menu>
        <MenuButton>
          <RiPlayListAddLine />
        </MenuButton>
        <MenuList>
          <MenuItem>Add to experience</MenuItem>
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
