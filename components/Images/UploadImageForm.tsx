import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { Button, Flex, FormControl, Heading, Input } from "@chakra-ui/react";
import { InputImageWithPreview } from "./InputImageWithPreview";
import {
  UploadType,
  useGetPresignedUrlsMutation,
  useSaveImagesMutation,
} from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { FormControlImages } from "./FormControlImages";

async function uploadFileWithPreSignedUrl(
  file: File,
  uploadUrl: string
): Promise<boolean> {
  return new Promise(async (resolve, reject) => {
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
        reject(false);
      }
      resolve(true);
    });
  });
}

interface UploadImageFormProps {
  wineryAlias: string;
  wineryId: number;
  contextHeader: ContextHeader;
  setImages: Dispatch<SetStateAction<string[]>>;
}

export const UploadImageForm: FC<UploadImageFormProps> = ({
  wineryAlias,
  wineryId,
  contextHeader,
  setImages,
}) => {
  const [, getPresignedUrls] = useGetPresignedUrlsMutation();
  const [, saveImages] = useSaveImagesMutation();

  const [savedImageNames, setSavedImageNames] = useState([]);
  const [error, setError] = useState<any>(null);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetImage, setResetImage] = useState(false);

  useEffect(() => {
    const asyncFn = async () => {
      const fileExtension = file.name.split(".").pop();
      const imageNames = [`${fileName}.${fileExtension}`];
      const { error, data } = await getPresignedUrls(
        {
          wineryId: wineryId,
          wineryAlias: wineryAlias,
          uploadType: UploadType.WineryPic,
          fileNames: imageNames,
        },
        { ...contextHeader, requestPolicy: "network-only" }
      );
      if (error) {
        setError(error);
      }
      if (data) {
        const uploadUrl = data.preSignedUrl.arrayUrl[0];
        if (uploadUrl?.errors?.length > 0 || uploadUrl.putUrl == null) {
          setError(uploadUrl?.errors[0]);
          return;
        }
        const isUploaded = await uploadFileWithPreSignedUrl(
          file,
          uploadUrl!.putUrl
        );
        if (isUploaded) {
          const { error, data: savedImage } = await saveImages(
            {
              wineryId: wineryId,
              wineryAlias: wineryAlias,
              imageNames,
            },
            { ...contextHeader, requestPolicy: "network-only" }
          );
          const getUrl = data.preSignedUrl.arrayUrl[0].getUrl;
          if (error) {
            setError(error);
            return;
          }
          setSavedImageNames([savedImage.saveImages.imageNames]);
          setImages((images) => [...images, getUrl]);
        }
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
      {!error && (
        <Button type="submit" isLoading={loading}>
          Upload File
        </Button>
      )}
      {savedImageNames.length > 0 && (
        <Flex justifyContent="center" m={5} flexDirection="column">
          <Heading as="h2" size="xl" my={4}>
            Uploaded:{" "}
          </Heading>
          {savedImageNames.map((name, index) => {
            return (
              <Heading as="h3" key={index} size="md">
                {name}
              </Heading>
            );
          })}
        </Flex>
      )}
    </FormControlImages>
  );
};
