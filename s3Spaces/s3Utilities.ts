import { Endpoint, S3 } from "aws-sdk";
import { ChangeEvent } from "react";

const spacesEndpoint = new Endpoint(
  process.env.NEXT_PUBLIC_DO_SPACES_ENDPOINT as string
);

const config: AWS.S3.Types.ClientConfiguration = {
  endpoint: spacesEndpoint as any,
  accessKeyId: process.env.NEXT_PUBLIC_DO_SPACES_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_DO_SPACES_SECRET,
};

const s3 = new S3(config);

export const handleFileUpload = async (
  e: ChangeEvent<HTMLInputElement>,
  userId: number
) => {
  if (e.currentTarget.files && e.currentTarget.files[0]) {
    const newFolder = `${userId}-profilePic`;
    const newFile = e.currentTarget.files[0];
    const paramsPutObject: AWS.S3.Types.PutObjectRequest = {
      Bucket: `${process.env.NEXT_PUBLIC_DO_SPACES_NAME}/${newFolder}`, // if the user already uploaded a pic, it will use the same bucket
      Body: newFile,
      Key: `profilePic`, // if the name exists, it will replace
    };
    const response = await s3
      .putObject(paramsPutObject)
      .on("build", (request) => {
        request.httpRequest.headers["Content-Length"] = (
          paramsPutObject.Body as File
        )?.size.toString();
        request.httpRequest.headers["x-amz-acl"] = "public-read";
        request.httpRequest.headers["Access-Control-Allow-Origin"] = "*";
      })
      .promise();
    return {
      statusCode: response.$response.httpResponse.statusCode,
    };
  } else {
    return {
      statusCode: 500,
    };
  }
};

export async function handleFileRetrieval(userId: number) {
  const userFolder = `${userId}-profilePic`;

  const paramsPutObject: AWS.S3.Types.GetObjectRequest = {
    Bucket: `${process.env.NEXT_PUBLIC_DO_SPACES_NAME}/${userFolder}`, // if the user already uploaded a pic, it will use the same bucket
    Key: `profilePic`, // if the name exists, it will replace
  };

  let returnValue;
  try {
    const file = await s3.getObject(paramsPutObject).promise();
    returnValue = {
      data: file.Body,
      mimetype: file.ContentType,
    };
  } catch (e) {
    //console.log(e)
    returnValue = {
      data: "",
    };
  }
  return returnValue;
}

export async function createUserFolder(userId: number) {
  const newFolder = `${userId}-profilePic`;

  const paramsPutObject: AWS.S3.Types.PutObjectRequest = {
    Bucket: `${process.env.NEXT_PUBLIC_DO_SPACES_NAME}/${newFolder}`, // if the user already uploaded a pic, it will use the same bucket
    Key: `emptyProfilePic`, // if the name exists, it will replace
  };
  const response = await s3
    .putObject(paramsPutObject)
    .on("build", (request) => {
      request.httpRequest.headers["x-amz-acl"] = "public-read";
      request.httpRequest.headers["Access-Control-Allow-Origin"] = "*";
    })
    .promise();

  return {
    statusCode: response.$response.httpResponse.statusCode,
  };
}
