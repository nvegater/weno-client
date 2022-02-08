import { UseToastOptions } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";

type ToastMessageType =
  | "uploadImageError"
  | "processingChangesInfo"
  | "imagesSavedSuccess"
  | "bookingNotPossibleServerError"
  | "bookingFailed"
  | "saved";

export const getToastMessage = (message: ToastMessageType): UseToastOptions => {
  const [t] = useTranslation("global");
  let toastOpts: UseToastOptions = {
    title: t("defaultMessage"),
    description: t("notRealDescription"),
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
      break;
    case "bookingNotPossibleServerError":
      toastOpts = {
        title: t("bookingFailed"),
        description: t("connectionErrors"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      };
      break;
    case "bookingFailed":
      toastOpts = {
        title: "Booking failed",
        description: t("errorApologize"),
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      };
      break;
    case "saved":
      toastOpts = {
        title: "Update Succesfull",
        description: "The information was saved",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
      break;
  }
  return toastOpts;
};
