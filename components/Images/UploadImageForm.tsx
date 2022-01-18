import React, { FC, useEffect, useState } from "react";
import { Button, FormControl, Input } from "@chakra-ui/react";
import { InputImageWithPreview } from "./InputImageWithPreview";
import {
  UploadType,
  useGetPresignedUrlsMutation,
} from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { FormControlImages } from "./FormControlImages";

async function uploadFileWithPreSignedUrl(
  file: File,
  uploadUrl: string
): Promise<void> {
  await fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
      "x-amz-acl": "public-read",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": "true",
    },
  }).then((r) => {
    if (!r.ok) {
      throw new Error("HTTP status " + r.status);
    }
  });
}

interface UploadImageFormProps {
  wineryAlias: string;
  wineryId: number;
  contextHeader: ContextHeader;
}

export const UploadImageForm: FC<UploadImageFormProps> = ({
  wineryAlias,
  wineryId,
  contextHeader,
}) => {
  const [, getPresignedUrls] = useGetPresignedUrlsMutation();

  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetImage, setResetImage] = useState(false);

  useEffect(() => {
    const asyncFn = async () => {
      const fileExtension = file.name.split(".").pop();
      const { error, data } = await getPresignedUrls(
        {
          wineryId: wineryId,
          wineryAlias: wineryAlias,
          uploadType: UploadType.WineryPic,
          fileNames: [`${fileName}.${fileExtension}`],
        },
        { ...contextHeader, requestPolicy: "network-only" }
      );
      if (data && !error) {
        const uploadUrl = data.preSignedUrl.arrayUrl[0];
        if (uploadUrl?.errors?.length > 0 || uploadUrl.putUrl == null) {
          return;
        }
        await uploadFileWithPreSignedUrl(file, uploadUrl!.putUrl);
      }
      setLoading(false);
      setFileName("");
      setResetImage(true);
    };
    if (!loading && fileName) {
      setLoading(true);
      asyncFn();
    }
  }, [file]);

  return (
    <FormControlImages setFileOnSubmit={setFile}>
      <InputImageWithPreview
        resetImage={resetImage}
        setResetImage={setResetImage}
      />
      <FormControl isRequired>
        <Input
          my={1}
          type="text"
          name="fileName"
          id="fileName"
          placeholder="Image name"
          onChange={(e) => {
            setFileName(e.target.value);
          }}
          value={fileName}
        />
      </FormControl>
      <Button type="submit" isLoading={loading}>
        Upload File
      </Button>
    </FormControlImages>
  );
};
