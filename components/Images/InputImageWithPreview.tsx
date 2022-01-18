import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { FormControl, Image, Input } from "@chakra-ui/react";

interface PreviewImageProps {
  resetImage: boolean;
  setResetImage: Dispatch<SetStateAction<boolean>>;
}

export const InputImageWithPreview: FC<PreviewImageProps> = ({
  resetImage,
  setResetImage,
}) => {
  const [previewImage, setPreviewImage] = useState<string>("");
  const ref = useRef<HTMLInputElement>();

  function handleOnChange(changeEvent): void {
    const reader = new FileReader();
    reader.onload = function (onLoadEvent) {
      setPreviewImage(onLoadEvent.target.result as string);
    };
    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  useEffect(() => {
    if (resetImage) {
      setPreviewImage("");
      setResetImage(false);
      if (ref?.current?.value) {
        ref.current.value = "";
      }
    }
  }, [resetImage, setResetImage]);

  return (
    <>
      <FormControl isRequired>
        <Input
          mt={1}
          type="file"
          name="file"
          id="image"
          onChange={handleOnChange}
          ref={ref}
        />
      </FormControl>
      {previewImage !== "" && <Image src={previewImage} alt="uploaded image" />}
    </>
  );
};
