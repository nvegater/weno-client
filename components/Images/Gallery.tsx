import React, { FC, FormEvent, useState } from "react";
import {
  Button,
  Center,
  FormControl,
  FormLabel,
  Grid,
  Image,
  Input,
} from "@chakra-ui/react";

const placeHolder =
  "https://images.unsplash.com/photo-1505944270255-72b8c68c6a70?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFjaWFsfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60";

const images_const = [placeHolder, placeHolder, placeHolder, placeHolder];

interface GalleryProps {
  wineryAlias: string;
}

export const Gallery: FC<GalleryProps> = ({ wineryAlias }) => {
  console.log(wineryAlias);
  const [imageSrc, setImageSrc] = useState<string>("");
  const [uploadData, setUploadData] = useState();
  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */
  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result as string);
      setUploadData(undefined);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */
  async function handleOnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const inputElement = Array.from(event.currentTarget.elements).find(
      // @ts-ignore
      (element) => element.name === "file"
    );
    const formImageInput = inputElement as HTMLInputElement;

    const formData = new FormData();
    for (const file of formImageInput.files) {
      formData.append("file", file);
    }

    formData.append("upload_preset", "winery-uploads");
    const data = await fetch(
      "https://api.cloudinary.com/v1_1/nvegater/image/upload",
      {
        method: "POST",
        body: formData,
      }
    ).then((r) => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }

  return (
    <Grid gridTemplateColumns="repeat(auto-fit, minmax(274px, 1fr))" gap={3}>
      {images_const.map((imageUrl, index) => {
        return <Image key={index} src={imageUrl} alt={index.toString()} />;
      })}
      <Center>
        <FormControl
          method="post"
          as="form"
          onChange={handleOnChange}
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
          {imageSrc && !uploadData && (
            <Button type="submit">Upload Files</Button>
          )}
          {uploadData && (
            <code>
              <pre>{JSON.stringify(uploadData, null, 2)}</pre>
            </code>
          )}
        </FormControl>
      </Center>
    </Grid>
  );
};
