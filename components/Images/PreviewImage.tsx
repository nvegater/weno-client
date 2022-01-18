import React, { FC, useState } from "react";
import { FormControl, Image, Input } from "@chakra-ui/react";

interface PreviewImageProps {}

export const PreviewImage: FC<PreviewImageProps> = ({}) => {
  const [previewImage, setPreviewImage] = useState<string>("");

  function handleOnChange(changeEvent): void {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setPreviewImage(onLoadEvent.target.result as string);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  return (
    <>
      <FormControl isRequired>
        <Input
          mt={1}
          type="file"
          name="file"
          id="image"
          onChange={handleOnChange}
        />
      </FormControl>
      {previewImage !== "" && <Image src={previewImage} alt="uploaded image" />}
    </>
  );
};
