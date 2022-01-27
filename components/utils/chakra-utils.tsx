import { UseToastOptions } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type ToastMessageType =
  | "uploadImageError"
  | "processingChangesInfo"
  | "imagesSavedSuccess";

export const getToastMessage = (message: ToastMessageType): UseToastOptions => {
  const [t] = useTranslation("global");
  let toastOpts: UseToastOptions = {
    title: "default message",
    description: "Not a real description",
    status: "warning",
    duration: 1000,
    isClosable: true,
    position: "top",
  };

  switch (message) {
    case "uploadImageError":
      toastOpts = {
        title: "Error",
        description: t("uploadImageError"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
      break;
    case "processingChangesInfo":
      toastOpts = {
        title: t("savingImage"),
        description: t("processingChanges"),
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
      break;
    case "imagesSavedSuccess":
      toastOpts = {
        title: t("ready"),
        description: t("imagesSaved"),
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
  }
  return {
    title: "Error",
    description: t("uploadImageError"),
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top",
  };
};
