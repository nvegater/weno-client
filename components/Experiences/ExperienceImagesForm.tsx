import React, { Dispatch, FC, SetStateAction, useState } from "react";
import imageCompression from "browser-image-compression";
import ExperienceGallery from "./ExperienceGallery";
import {
  PreSignedUrlFragment,
  SaveExperienceImagesUrlsMutation,
  SaveExperienceImagesUrlsMutationVariables,
  UploadType,
  usePreSignedUrlQuery,
  useSaveExperienceImagesUrlsMutation,
} from "../../graphql/generated/graphql";
import { ContextHeader } from "../Authentication/useAuth";
import { useRouter } from "next/router";
import { useToast } from "@chakra-ui/react";
import { getToastMessage } from "../utils/chakra-utils";
import { useEffectOnChange } from "../utils/react-utils";
import { UseFormSetError } from "react-hook-form";
import { OperationContext, OperationResult } from "urql";

// you should provide one of maxSizeMB, maxWidthOrHeight in the options
const options = {
  maxSizeMB: 1, // (default: Number.POSITIVE_INFINITY)
  maxWidthOrHeight: 1920, // compressedFile will scale down by ratio to a point that width or height is smaller than maxWidthOrHeight (default: undefined)
  useWebWorker: true, // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
};

const uploadImage = (putURL: string, file: File) =>
  new Promise(async (resolve, reject) => {
    try {
      const compressedFile = await imageCompression(file, options);
      console.log(
        `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
      );
      console.log(`originalFile size ${file.size / 1024 / 1024} MB`);

      const httpReq = new XMLHttpRequest();
      httpReq.open("PUT", putURL);
      httpReq.setRequestHeader("x-amz-acl", "public-read");
      httpReq.setRequestHeader("visibility", "public");
      httpReq.setRequestHeader("Access-Control-Allow-Origin", "*");
      httpReq.onreadystatechange = () => {
        if (httpReq.readyState === 4 && httpReq.status === 200) {
          resolve(true);
        }
        httpReq.upload.onerror = () => {
          reject(false);
        };
      };
      httpReq.send(compressedFile);
    } catch (error) {
      reject(false);
    }
  });

const uploadingImageAfterRender = async (
  preSignedUrls: PreSignedUrlFragment[],
  files: Array<File>,
  experienceId: number,
  setError: UseFormSetError<any>,
  setSuccessUploading: Dispatch<SetStateAction<boolean>>,
  saveImageUrls: (
    variables?: SaveExperienceImagesUrlsMutationVariables,
    context?: Partial<OperationContext>
  ) => Promise<
    OperationResult<
      SaveExperienceImagesUrlsMutation,
      SaveExperienceImagesUrlsMutationVariables
    >
  >,
  contextHeader: ContextHeader
) => {
  const preSignedUrlsList = await Promise.all(
    preSignedUrls.map(async (preSigned, index) => {
      const uploadImageResult = await uploadImage(
        preSigned.putUrl as string,
        files[index]
      );
      return uploadImageResult ? preSigned.getUrl : null;
    })
  );
  const { data: result, error } = await saveImageUrls(
    {
      preSignedUrls: preSignedUrlsList.filter(
        (getUrl) => getUrl !== null
      ) as Array<string>,
      experienceId: experienceId,
    },
    { ...contextHeader, requestPolicy: "network-only" }
  );
  if (error) {
    setError("submit", {
      type: error.name,
      message: error.message,
    });
  }
  if (result && result.saveExperienceImagesUrls.errors !== null) {
    setError(result.saveExperienceImagesUrls.errors[0].field, {
      type: "Field error",
      message: result.saveExperienceImagesUrls.errors[0].message,
    });
  }
  if (
    result &&
    result.saveExperienceImagesUrls.experienceImages !== null &&
    result.saveExperienceImagesUrls.experienceImages.length > 0
  ) {
    setSuccessUploading(true);
  }
};

interface ExperienceImagesFormProps {
  pauseImageUpload: boolean;
  experienceId: null | number;
  contextHeader: ContextHeader;
  setError: UseFormSetError<any>;
}

export const ExperienceImagesForm: FC<ExperienceImagesFormProps> = ({
  pauseImageUpload,
  contextHeader,
  experienceId,
  setError,
}) => {
  const router = useRouter();

  const toast = useToast();

  const [files, setFiles] = useState<Array<File>>([]);
  const [localError, setLocalError] = useState(false);
  const [successUploading, setSuccessUploading] = useState(false);

  const [{ data: uploadImageResponse, fetching, error: preSignedError }] =
    usePreSignedUrlQuery({
      pause: pauseImageUpload || experienceId === null,
      variables: {
        presignedUrlInputs: {
          fileNames: files.map((f) => f.name),
          uploadType: UploadType.Experiencealbum,
          experienceId: experienceId,
        },
      },
      context: contextHeader,
      requestPolicy: "network-only",
    });

  useEffectOnChange(() => {
    if (preSignedError) {
      setError("submit", {
        type: preSignedError.name,
        message: preSignedError.message,
      });
      setLocalError(true);
    }
    if (uploadImageResponse.preSignedUrl.errors !== null) {
      setError(uploadImageResponse.preSignedUrl.errors[0].field, {
        type: "Field error",
        message: uploadImageResponse.preSignedUrl.errors[0].message,
      });
      setLocalError(true);
    }
  }, [preSignedError, setError, uploadImageResponse]);

  const [, saveImageUrls] = useSaveExperienceImagesUrlsMutation();
  useEffectOnChange(() => {
    if (
      !localError &&
      uploadImageResponse &&
      uploadImageResponse.preSignedUrl &&
      uploadImageResponse.preSignedUrl.arrayUrl &&
      uploadImageResponse.preSignedUrl.arrayUrl.length > 0
    ) {
      toast(getToastMessage("processingChangesInfo"));
      uploadingImageAfterRender(
        uploadImageResponse.preSignedUrl.arrayUrl,
        files,
        experienceId,
        setError,
        setSuccessUploading,
        saveImageUrls,
        contextHeader
      );
    } else {
      setLocalError(true);
    }
  }, [experienceId, files, router, toast, uploadImageResponse]);

  useEffectOnChange(() => {
    if (localError) {
      toast(getToastMessage("uploadImageError"));
    }
    if (successUploading) {
      toast(getToastMessage("imagesSavedSuccess"));
      router.reload();
    }
  }, [toast]);

  return (
    <ExperienceGallery
      allowEdit={!fetching && !preSignedError}
      onGalleryChanged={(files) => setFiles([...files])}
    />
  );
};
