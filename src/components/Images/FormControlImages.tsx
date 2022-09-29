import React, { FC, FormEvent, ReactNode } from "react";
import { FormControl } from "@chakra-ui/react";

interface FileInputsCleanerProps {
  setFileOnSubmit: React.Dispatch<React.SetStateAction<File>>;
  children: ReactNode;
}

export const FormControlImages: FC<FileInputsCleanerProps> = ({
  setFileOnSubmit,
  children,
}) => {
  const getFile = (e: FormEvent<HTMLDivElement>) => {
    const event = e as unknown as FormEvent<HTMLFormElement>;
    const fileInput = Array.from(event.currentTarget.elements).find(
      // @ts-ignore
      (element) => element.name === "file"
    );
    const formFileInput = fileInput as HTMLInputElement;
    setFileOnSubmit(formFileInput.files.item(0));
  };

  return (
    <FormControl
      as="form"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        getFile(event);
      }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      {children}
    </FormControl>
  );
};
