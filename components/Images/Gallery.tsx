import React, { FC, FormEvent } from "react";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
} from "@chakra-ui/react";
import useImageUpload from "./useImageUpload";

const placeHolder =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

const images_const = [placeHolder, placeHolder, placeHolder, placeHolder];

interface GalleryProps {
  wineryAlias: string;
}

export const Gallery: FC<GalleryProps> = ({ wineryAlias }) => {
  console.log(wineryAlias);

  const { handleOnChange, handleOnSubmit, imageSrc } = useImageUpload({});

  return (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(274px, 1fr))" gap={3}>
      {images_const.map((imageUrl, index) => {
        return <Image key={index} src={imageUrl} alt={index.toString()} />;
      })}
      <Center>
        <FormControl
          method="post"
          as="form"
          onChange={(event) => handleOnChange(event)}
          onSubmit={(event) =>
            handleOnSubmit(event as unknown as FormEvent<HTMLFormElement>)
          }
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
        >
          <FormLabel htmlFor="image">Upload an image</FormLabel>
          <Input mt={1} type="file" name="file" id="image" />
          {imageSrc !== "" && <Image src={imageSrc} alt="uploaded image" />}
          <Button type="submit">Upload Files</Button>
        </FormControl>
      </Center>
    </Grid>
  );
};
