import React, { FC, FormEvent, ReactNode } from "react";
import { FormControl } from "@chakra-ui/react";

interface FileInputsCleanerProps {
  setFile: React.Dispatch<React.SetStateAction<File>>;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
  children: ReactNode;
}

export const FormControlImages: FC<FileInputsCleanerProps> = ({
  setFile,
  setFileName,
  children,
}) => {
  const getInputValuesAfterSubmit = (e: FormEvent<HTMLDivElement>) => {
    const event = e as unknown as FormEvent<HTMLFormElement>;
    const fileInput = Array.from(event.currentTarget.elements).find(
      // @ts-ignore
      (element) => element.name === "file"
    );

    const fileNameInput = Array.from(event.currentTarget.elements).find(
      // @ts-ignore
      (element) => element.name === "fileName"
    );
    const formFileInput = fileInput as HTMLInputElement;
    const formFileNameInput = fileNameInput as HTMLInputElement;

    // This triggers the useEffect down There to get the pre-signed urls
    setFile(formFileInput.files.item(0));
    setFileName(formFileNameInput.value);
  };

  return (
    <FormControl
      as="form"
      method="post"
      onSubmit={(event) => {
        event.preventDefault();
        getInputValuesAfterSubmit(event);
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
