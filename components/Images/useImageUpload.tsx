import { FormEvent, useState } from "react";

interface useImageUploadHookProps {}

interface useImageUploadHookResult {
  handleOnChange: (event: FormEvent<HTMLDivElement>) => void;
  handleOnSubmit: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  imageSrc: string;
}

type useImageUploadHook = (
  props: useImageUploadHookProps
) => useImageUploadHookResult;

const useImageUpload: useImageUploadHook = (props) => {
  const [imageSrc, setImageSrc] = useState<string>("");

  function handleOnChange(changeEvent): void {
    const reader = new FileReader();

    reader.onload = function (onLoadEvent) {
      setImageSrc(onLoadEvent.target.result as string);
    };

    reader.readAsDataURL(changeEvent.target.files[0]);
  }
  async function handleOnSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
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
  }

  return { handleOnChange, handleOnSubmit, imageSrc };
};

export default useImageUpload;
