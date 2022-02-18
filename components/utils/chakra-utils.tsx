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
    title: "Default",
    description: "default",
    status: "warning",
    duration: 1000,
    isClosable: true,
    position: "top",
  };

  switch (message) {
    case "uploadImageError":
      toastOpts = {
        title: "Error",
        description: "No pudimos cargar tus imagenes",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
      break;
    case "processingChangesInfo":
      toastOpts = {
        title: "Guardando Imágen",
        description: "Procesando cambios",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
      break;
    case "imagesSavedSuccess":
      toastOpts = {
        title: "Listo",
        description: "Imagen guardada",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
      break;
    case "bookingNotPossibleServerError":
      toastOpts = {
        title: "Error en la reserva",
        description: "Error en el servidor",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      };
      break;
    case "bookingFailed":
      toastOpts = {
        title: "Error en la reserva",
        description: "Error en el servidor",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      };
      break;
    case "saved":
      toastOpts = {
        title: "Actualización exitosa",
        description: "",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      };
      break;
  }
  return toastOpts;
};
