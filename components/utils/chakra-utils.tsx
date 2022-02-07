import { UseToastOptions } from "@chakra-ui/react";

type ToastMessageType =
  | "uploadImageError"
  | "processingChangesInfo"
  | "imagesSavedSuccess"
  | "bookingNotPossibleServerError"
  | "bookingFailed"
  | "saved";

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
      break;
    case "bookingNotPossibleServerError":
      toastOpts = {
        title: "Booking failed",
        description: "There seems to be a connection error",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      };
      break;
    case "bookingFailed":
      toastOpts = {
        title: "Booking failed",
        description:
          "There was an error in our servers. We apologize for the inconvenience",
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
