import React, { FC, useState } from "react";
import imageCompression from "browser-image-compression";
import ExperienceGallery from "./ExperienceGallery";

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

interface ExperienceImagesFormProps {}

export const ExperienceImagesForm: FC<ExperienceImagesFormProps> = () => {
  const [files, setFiles] = useState<Array<File>>([]);

  return (
    <ExperienceGallery
      allowEdit={true}
      currentGallery={[]}
      onGalleryChanged={(files) => setFiles([...files])}
      onCoverChanged={() => {}}
    />
  );
};
