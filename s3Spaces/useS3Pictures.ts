import { useEffect, useState } from "react";
import {
  createUserFolder,
  handleFileRetrieval,
  handleFileUpload,
} from "./s3Utilities";
import { useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

const useS3Pictures = (userId: number | null | undefined) => {
  const [pictureUrlFromS3, setPictureURLFromS3] = useState<any>();
  const [statusCodeState, setStatusCodeState] = useState<number>();
  const [t] = useTranslation("global");
  const toast = useToast();

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imageIsToBig =
      event.currentTarget && event.currentTarget.files
        ? event.currentTarget.files[0].size > 1_048_576 // bytes = 1MB
        : true;
    if (userId && !imageIsToBig) {
      toast({
        title: t("changingImage"),
        description: "",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      handleFileUpload(event, userId).then((result) => {
        setStatusCodeState(result.statusCode);
      });
    } else {
      toast({
        title: t("imageSizeError"),
        description: t("uploadSmallerPicture"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  useEffect(() => {
    if (userId) {
      handleFileRetrieval(userId).then((fileResponse) => {
        if (fileResponse.data === "") {
          setPictureURLFromS3(fileResponse.data);
          createUserFolder(userId);
        } else {
          const blob = new Blob([fileResponse.data as any], {
            type: "image/jpeg",
          });
          const urlCreator = window.URL || window.webkitURL;
          const imageUrl = urlCreator.createObjectURL(blob);
          setPictureURLFromS3(imageUrl);
        }
        setStatusCodeState(0);
      });
    }
  }, [userId]);

  useEffect(() => {
    if (statusCodeState === 200 && userId) {
      handleFileRetrieval(userId).then((fileResponse) => {
        if (fileResponse.data === "") {
          setPictureURLFromS3(fileResponse.data);
          createUserFolder(userId);
        } else {
          const blob = new Blob([fileResponse.data as any], {
            type: "image/jpeg",
          });
          const urlCreator = window.URL || window.webkitURL;
          const imageUrl = urlCreator.createObjectURL(blob);
          setPictureURLFromS3(imageUrl);
        }
        setStatusCodeState(0);
      });
    }
  }, [statusCodeState]);

  return {
    pictureUrlFromS3,
    handleFileInput,
  };
};

export default useS3Pictures;
