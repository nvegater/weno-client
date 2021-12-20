import { UseToastOptions } from "@chakra-ui/react";

type ToastMessageType =
  | "uploadImageError"
  | "processingChangesInfo"
  | "imagesSavedSuccess";

export const getToastMessage = (message: ToastMessageType): UseToastOptions => {
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
        description: "We couldnt upload your images",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
      break;
    case "processingChangesInfo":
      toastOpts = {
        title: "Saving Image",
        description: "Processing changes",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
      break;
    case "imagesSavedSuccess":
      toastOpts = {
        title: "Ready",
        description: "We saved your images",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
  }
  return {
    title: "Error",
    description: "We couldnt upload your images",
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top",
  };
};
